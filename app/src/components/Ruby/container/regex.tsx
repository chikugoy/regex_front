import React, {useCallback, useContext, useEffect, useRef, useState} from 'react'
import {IRegexChecker, RegexChecker} from '../presentational/regexChecker'
import {IRegexSaveProps, RegexSave} from '../presentational/regexSave'
import {RegexList} from '../presentational/regexList'
import {LoginModal} from '../presentational/loginModal'
import {setUserContext, userContext} from '../../../userProvider'
import {toast, Toaster} from 'react-hot-toast'
import {getRedirectResult, GoogleAuthProvider, signOut} from 'firebase/auth'
import {auth} from '../../../firebase/firebase'
import logo from '../../../images/logo.png'
import githubLogo from '../../../images/github.png'
import {useInterval} from '../hock/useInterval'
import {clone, cloneDeep, isEmpty} from 'lodash'
import {useGetApi} from '../../../repositories/api/useGetApi'
import {usePostApi} from '../../../repositories/api/usePostApi'
import {usePutApi} from '../../../repositories/api/usePutApi'
import {useDeleteApi} from "../../../repositories/api/useDeleteApi"
import {StyledRegexContent, StyledRegexWhole} from "../styled"

const getInitRegex = () => {
  return {
    text: '',
    option_text: '',
    check_targets: [{target: '', result: undefined} as ICheckTarget],
    title: '',
    tags: [''],
    good_user_ids: [''],
    good_user_count: 0,
    supplement: '',
  } as IRegex
}

export const Regex = () => {
  const [loginShowModal, setLoginShowModal] = useState<boolean>(false)
  const [regex, setRegex] = useState<IRegex>(getInitRegex())
  const [ownRegexes, setOwnRegexes] = useState<IRegex[]>([])
  const [recommendRegexes, setRecommendRegexes] = useState<IRegex[]>([])
  const useUserContext = () => useContext(userContext)
  const user = useUserContext()
  const useSetUserContext = () => useContext(setUserContext)
  const setUser = useSetUserContext()
  const responseOwnRegex = useGetApi<IRegex[]>(user?.uid ? '/api/v1/regexes?user_id=' + user.uid : null)
  const responseRecommendRegex = useGetApi<IRegex[]>('/api/v1/regexes?is_recommend=true')
  const beforeRegexTime = useRef<Date | null>(null)
  const processing = useRef(false)
  const [isOpenAddModal, setOpenAddModal] = useState<boolean>(false)
  const [isOpenEditModal, setOpenEditModal] = useState<boolean>(false)
  const [isOpenDeleteModal, setOpenDeleteModal] = useState<boolean>(false)

  useEffect(() => {
    let ignore = false;
    (async() => {
      if (ignore) {
        return
      }

      const checkTargetsStorage = sessionStorage.getItem('check_targets')
      const checkTargets = checkTargetsStorage ? JSON.parse(checkTargetsStorage) as ICheckTarget[] : [{target: '', result: undefined} as ICheckTarget] as ICheckTarget[]
      const tagsStorage = sessionStorage.getItem('tags')
      const tags = tagsStorage ? JSON.parse(tagsStorage) as string[] : ['']

      const regex = {
        text: sessionStorage.getItem('text') || '',
        option_text: sessionStorage.getItem('option_text') || '',
        title: sessionStorage.getItem('title') || '',
        supplement: sessionStorage.getItem('supplement') || '',
        tags: tags,
        good_user_ids: [''],
        good_user_count: 0,
        check_targets: checkTargets,
      } as IRegex
      setRegex(regex)

      if (!responseOwnRegex?.is_loading && !responseOwnRegex?.is_error) {
        setOwnRegexes(responseOwnRegex.data)
      }
      if (!responseRecommendRegex.is_loading && !responseRecommendRegex?.is_error) {
        setRecommendRegexes(responseRecommendRegex.data)
      }

      return () => {
        ignore = true
      }
    })()
  },[
    user,
    responseOwnRegex?.is_loading,
    responseOwnRegex?.is_error,
    responseRecommendRegex?.is_loading,
    responseRecommendRegex?.is_error
  ])

  const onSubmitCallback = useCallback(() => {
    setRegex(getInitRegex())

    sessionStorage.removeItem('id')
    sessionStorage.removeItem('text')
    sessionStorage.removeItem('option_text')
    sessionStorage.removeItem('check_targets')
    sessionStorage.removeItem('title')
    sessionStorage.removeItem('tags')
    sessionStorage.removeItem('supplement');

    (async() => {
      const dataRecommendRegex = await responseRecommendRegex.reload('/api/v1/regexes?is_recommend=true')
      if (dataRecommendRegex.status !== 200) {
        console.log('recommend list error')
        console.log(dataRecommendRegex)
        return
      }
      setRecommendRegexes(dataRecommendRegex.data.data as IRegex[])

      const dataOwnRegex = await responseOwnRegex.reload('/api/v1/regexes?user_id=' + user.uid)
      if (dataOwnRegex.status !== 200) {
        console.log('own list error')
        console.log(dataOwnRegex)
        return
      }
      setOwnRegexes(dataOwnRegex.data.data as IRegex[])
    })()
  }, [user])

  const handleOpenLoginModal = () => {
    setLoginShowModal(true)
  }

  const handleLogout = async () => {
    signOut(auth).then(() => {
      setUser({} as IUser)
      toast.success('ログアウトしました')
    }).catch((error) => {
      console.log(`logout error (${error})`)
    })
  }

  const handleChangeLanguage = useCallback(() => {
    toast('現在準備中です')
  }, [])

  const handleOpenGithub = () => {
    window.open("https://github.com/chikugoy/regex_backend", '_blank');
  }

  const handleRegexEdit = useCallback((regexes: IRegex[], regexId?: string) => {
    const regex = regexes.find((regex: IRegex) => regex.id === regexId)
    if (!regex) {
      toast.error('チェックデータが見つかりません')
      return
    }

    setRegex(regex)
    sessionStorage.setItem('id', regex.id || '')

    window.scrollTo(0, 0);
  }, [])


  const handleLike = useCallback((regexes: IRegex[], regexId?: string) => {
    if (!user?.uid) {
      toast.error('ログインが必要です')
    }

    (async () => {
      const regex = ownRegexes.find((regex: IRegex) => regex.id === regexId)
      if (regex?.good_user_ids.includes(user.uid)) {
        return
      }

      const data = {
        token: user.accessToken,
        user_id: user.uid,
      }

      // eslint-disable-next-line react-hooks/rules-of-hooks
      const res = await usePostApi(
        `/api/v1/regexes/${regexId}/like`,
        data
      ).catch(err => {
        return err.response
      });

      if (res.status !== 200) {
        console.log(res)
        return
      }

      const resultOwnRegexes = ownRegexes.map((regex: IRegex) => {
        if (regex.id === regexId && !regex.good_user_ids.includes(user.uid)) {
          regex.good_user_ids.push(user.uid)
          regex.good_user_ids = Array.from(new Set(regex.good_user_ids))
          regex.good_user_count = regex.good_user_ids.length
        }
        return regex;
      })
      setOwnRegexes(resultOwnRegexes)
      const resultRecommendRegexes = recommendRegexes.map((regex: IRegex) => {
        if (regex.id === regexId && !regex.good_user_ids.includes(user.uid)) {
          regex.good_user_ids.push(user.uid)
          regex.good_user_ids = Array.from(new Set(regex.good_user_ids))
          regex.good_user_count = regex.good_user_ids.length
        }
        return regex;
      })
      setRecommendRegexes(resultRecommendRegexes)
    })()
  }, [user, ownRegexes, recommendRegexes])

  const handleDisLike = useCallback((regexes: IRegex[], regexId?: string) => {
    if (!user?.uid) {
      toast.error('ログインが必要です')
    }

    (async () => {
      const regex = ownRegexes.find((regex: IRegex) => regex.id === regexId)
      if (!regex?.good_user_ids.includes(user.uid)) {
        return
      }

      const data = {
        token: user.accessToken,
        user_id: user.uid,
      }

      // eslint-disable-next-line react-hooks/rules-of-hooks
      const res = await usePostApi(
        `/api/v1/regexes/${regexId}/dislike`,
        data
      ).catch(err => {
        return err.response
      });

      if (res.status !== 200) {
        console.log(res)
        return
      }

      const resultOwnRegexes = ownRegexes.map((regex: IRegex) => {
        if (regex.id === regexId && regex.good_user_ids.indexOf(user.uid) != -1) {
          delete regex.good_user_ids[regex.good_user_ids.indexOf(user.uid)]
          regex.good_user_ids = regex.good_user_ids.filter(v => v)
          regex.good_user_count = regex.good_user_ids.length
        }
        return regex;
      })
      setOwnRegexes(resultOwnRegexes)
      const resultRecommendRegexes = recommendRegexes.map((regex: IRegex) => {
        if (regex.id === regexId && regex.good_user_ids.indexOf(user.uid) != -1) {
          delete regex.good_user_ids[regex.good_user_ids.indexOf(user.uid)]
          regex.good_user_ids = regex.good_user_ids.filter(v => v)
          regex.good_user_count = regex.good_user_ids.length
        }
        return regex;
      })
      setRecommendRegexes(resultRecommendRegexes)
    })()
  }, [user, ownRegexes, recommendRegexes])

  const handleRegexClear = useCallback(() => {
    setRegex(getInitRegex())

    sessionStorage.removeItem('id')
  }, [])

  // start regexChecker >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    regex.text = e.target.value
    setRegex((preRegex: IRegex) => ({ ...preRegex , ...regex}));
    sendRegex(e.target.value, regex.check_targets, regex.option_text)
    sessionStorage.setItem('text',e.target.value);
  }

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const optionText = distinctString(e.target.value)
    if (!checkOption(optionText)) return
    regex.option_text = e.target.value
    setRegex((preRegex: IRegex) => ({ ...preRegex , ...regex}));
    sendRegex(regex.text, regex.check_targets, optionText)
    sessionStorage.setItem('option_text',e.target.value);
  }

  const distinctString = (option: string): string => {
    return option.split('').filter((n, i) => option.indexOf(n) === i).join('');
  }

  const checkOption = (option: string): boolean => {
    if (option === '') return true

    let result = true
    option.split('').forEach((targetOption) => {
      if (targetOption !== 'i' && targetOption !== 'm' && targetOption !== 'x') {
        result = false
        return
      }
    })

    if (!result) {
      toast.error('正規表現のオプションには「i」、「m」、「x」のいずれかを入力してください。')
    }
    return result;
  }

  useInterval(function() {
    if (!beforeRegexTime.current) {
      return
    }
    const second = ((new Date()).getTime() - beforeRegexTime.current.getTime())
    if (second > 500) {
      beforeRegexTime.current = null
      sendRegex(regex.text, regex.check_targets, regex.option_text)
    }
  })

  const handleChangeCheckTarget = (e: React.ChangeEvent<HTMLTextAreaElement>, i: number) => {
    const newCheckTargets = cloneDeep(regex.check_targets)
    newCheckTargets[i].target = e.target.value
    regex.check_targets = newCheckTargets
    setRegex((preRegex: IRegex) => ({ ...preRegex , ...regex}));
    sessionStorage.setItem('check_targets', JSON.stringify(newCheckTargets));
    beforeRegexTime.current = new Date()
  }

  const sendRegex = (
    checkText: string, checkTargets: ICheckTarget[], optionText: string) => {
    if (!isSendRegex(checkText, checkTargets)) {
      initCheckTarget(checkText, checkTargets)
      return false;
    }
    const targets = checkTargets.map((checkTarget, i) => {
      return {
        target: checkTarget.target,
        index: i
      }
    });

    (async () => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const res = await usePostApi(
        '/api/v1/regexes/check',
        {text: checkText, targets: targets, option_text: optionText}
      ).catch(err => {
        return err.response
      });

      if (res.status !== 200) {
        console.log(res)
        return
      }

      const checkResults = res.data.data as ICheckResult[]
      regex.check_targets = clone(checkTargets).map((checkTarget: ICheckTarget, i: number) => {
        const checkResult = checkResults.filter((checkResult) => {
          return checkResult.index === i
        })
        return {
          target: checkTarget.target,
          result: checkResult && checkResult[0]
        }
      })
      setRegex((preRegex: IRegex) => ({ ...preRegex , ...regex}));
    })()
  }

  const isSendRegex = (checkText: string, checkTargets: ICheckTarget[]) => {
    if (!checkText) return false

    let result = false
    checkTargets.forEach((checkTarget) => {
      if (checkTarget.target) {
        result = true
        return
      }
    })
    return result
  }

  const initCheckTarget = (checkText: string, checkTargets: ICheckTarget[]) => {
    const newCheckTargets = cloneDeep(checkTargets)
    if (isEmpty(checkText)) {
      newCheckTargets.forEach((checkTarget) => {
        checkTarget.result = undefined
      })
      regex.check_targets = newCheckTargets
      setRegex((preRegex: IRegex) => ({ ...preRegex , ...regex}));
      return
    }

    newCheckTargets.forEach((checkTarget) => {
      if (!checkTarget.target) {
        checkTarget.result = undefined
      }
    })
    regex.check_targets = newCheckTargets
    setRegex((preRegex: IRegex) => ({ ...preRegex , ...regex}));
  }
  // end regexChecker <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

  // start regexSave >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  const handleTagsAdd = () => {
    if (regex.tags.length >= 8) {
      toast.error('8個以上のタグは設定できません')
      return
    }
    regex.tags = [
      ...regex.tags,
      ''
    ]
    setRegex((preRegex: IRegex) => ({ ...preRegex , ...regex}));
  }

  const handleTagsDelete = () => {
    regex.tags = regex.tags.slice(0, regex.tags.length - 1)
    setRegex((preRegex: IRegex) => ({ ...preRegex , ...regex}));
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    regex.title = e.target.value
    setRegex((preRegex: IRegex) => ({ ...preRegex , ...regex}));
    sessionStorage.setItem('title', e.target.value)
  }

  const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
    e.preventDefault()
    const newTags = cloneDeep(regex.tags)
    newTags[i] = e.target.value
    regex.tags = newTags
    setRegex((preRegex: IRegex) => ({ ...preRegex , ...regex}));
    sessionStorage.setItem('tags', JSON.stringify(newTags))
  }

  const handleSupplementChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault()
    regex.supplement = e.target.value
    setRegex((preRegex: IRegex) => ({ ...preRegex , ...regex}));
    sessionStorage.setItem('supplement', e.target.value)
  }

  const onAddSubmit = () => {
    setOpenAddModal(false);

    (async () => {
      const data = {
        token: user.accessToken,
        user_id: user.uid,
        text: regex.text,
        option_text: regex.option_text,
        check_targets: regex.check_targets,
        title: regex.title,
        tags: regex.tags,
        supplement: regex.supplement,
      }

      await toast.promise(
        // eslint-disable-next-line react-hooks/rules-of-hooks
        usePostApi('/api/v1/regexes', data),
        {
          loading: '保存中です...',
          success: () => {
            onSubmitCallback()
            processing.current = false
            return '保存しました'
          },
          error: (e) => {
            console.error(e)
            processing.current = false
            return '保存に失敗しました'
          }
        }
      )
    })()
  }

  const onEditSubmit = () => {
    setOpenEditModal(false);

    (async () => {
      const data = {
        token: user.accessToken,
        user_id: user.uid,
        text: regex.text,
        option_text: regex.option_text,
        check_targets: regex.check_targets,
        title: regex.title,
        tags: regex.tags,
        supplement: regex.supplement,
      }

      await toast.promise(
        // eslint-disable-next-line react-hooks/rules-of-hooks
        usePutApi('/api/v1/regexes/' + regex.id, data),
        {
          loading: '編集を保存中です...',
          success: () => {
            onSubmitCallback()
            processing.current = false
            return '編集を保存しました'
          },
          error: (e) => {
            console.error(e)
            processing.current = false
            return '編集の保存に失敗しました'
          }
        }
      )
    })()
  }

  const onDeleteSubmit = () => {
    setOpenDeleteModal(false);

    (async () => {
      await toast.promise(
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useDeleteApi('/api/v1/regexes/' + regex.id, user.accessToken),
        {
          loading: '削除中です...',
          success: () => {
            onSubmitCallback()
            processing.current = false
            return '削除しました'
          },
          error: (e) => {
            console.error(e)
            processing.current = false
            return '削除に失敗しました'
          }
        }
      )
    })()
  }

  const onAddClose = () => {
    setOpenAddModal(false)
    processing.current = false
  }

  const onEditClose = () => {
    setOpenEditModal(false)
    processing.current = false
  }

  const onDeleteClose = () => {
    setOpenDeleteModal(false)
    processing.current = false
  }

  const handleAdd = () => {
    if (!validate()) return
    if (!user.uid) {
      setLoginShowModal(true)
      return
    }
    if (processing.current) return
    processing.current = true
    setOpenAddModal(true)
  }

  const handleEdit = () => {
    if (!validate()) return
    if (!user.uid) {
      setLoginShowModal(true)
      return
    }
    if (processing.current) return
    processing.current = true
    setOpenEditModal(true)
  }

  const handleDelete = () => {
    if (!user.uid) {
      setLoginShowModal(true)
      return
    }
    if (processing.current) return
    processing.current = true
    setOpenDeleteModal(true)
  }

  const validate = (): boolean => {
    if (!regex.text) {
      toast.error('チェックしたい正規表現を入力してください。')
      return false
    }

    const targets = regex.check_targets.filter((target: ICheckTarget) => {
      return !!target.target
    })
    if (!targets) {
      toast.error('チェック対象の文字列を入力してください。')
      return false
    }

    const results = regex.check_targets.filter((target: ICheckTarget) => {
      return !!target.result
    })
    if (!results || !results.length) {
      toast.error('チェック結果がありません。')
      return false
    }

    const matchResults = regex.check_targets.filter((target: ICheckTarget) => {
      return target.result?.is_match
    })
    if (!matchResults || !matchResults.length) {
      toast.error('マッチしたチェック結果がありません。')
      return false
    }

    if (!regex.title) {
      toast.error('タイトルを入力してください。')
      return false
    }

    return true
  }
  // end regexSave <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

  // start loginModal >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  useEffect(() => {
    let ignore = false;
    if (ignore) {
      return
    }

    getRedirectResult(auth)
      .then((result) => {
        if (result !== null) {
          (async() => {
            const token = await result.user.getIdToken(true)
            loginAfter({
              ...result.user,
              accessToken: token
            } as IUser)
          })()
          return
        }
      }).catch((error) => {
      console.error(error)
    })

    return () => {
      ignore = true
    }
  }, [])

  const loginAfter = async (user: IUser) => {
    const data = {
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      accessToken: user.accessToken,
    } as IUser;

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const res = await usePostApi('/api/v1/users', data
    ).catch(err => {
      return err.response
    });

    if (res.status !== 200) {
      console.log(res)
      return
    }

    setUser(user)
    toast.success('ログインしました')
  }
  // end loginModal <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

  return (
    <div>
      <Toaster />
      <LoginModal loginShowModal={loginShowModal} setLoginShowModal={setLoginShowModal}/>
      <div className="flex h-16 justify-center bg-white shadow-lg">
        <div className="flex w-full max-w-3xl pt-1">
          <h1 className="text-3xl font-bold text-gray-700">
            <img className="mb-0.5 inline-block h-8 w-8" src={logo} alt="logo" />
            <div className="ml-2 inline-block pt-2">
              <span>Ruby </span>
              <span className="text-2xl">正規表現チェッカー</span>
              <span className="text-sm font-normal text-gray-600">（Ruby ver:3.1.2）</span>
            </div>
          </h1>
          <div className="ml-auto">
            <button
              type="button"
              className={`mr-3 mt-2  hidden rounded-md border bg-white py-2 px-4 text-sm text-gray-500 shadow hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 md:inline-block`}
              onClick={handleChangeLanguage}
            >
              言語切替
            </button>

            {user.uid ?
              <button
                type="button"
                className={`mt-2 inline-block rounded-md bg-sky-500 py-2 px-4 text-sm font-bold text-white shadow-md hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-400`}
                onClick={handleLogout}
              >
                ログアウト
              </button>
              :
              <button
                type="button"
                className={`mt-1 inline-block rounded-md bg-sky-500 py-2 px-4 text-sm font-bold text-white shadow-md hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-400`}
                onClick={handleOpenLoginModal}
              >
                ログイン
              </button>}
          </div>
          <img onClick={handleOpenGithub} className="absolute right-5 top-4 hidden h-7 w-7 hover:bg-gray-100 lg:inline-block" src={githubLogo} alt="github logo" />
        </div>
      </div>
      <StyledRegexWhole className="flex justify-center">
        <StyledRegexContent className="mt-8 mb-10 h-full w-2/3 max-w-3xl rounded-lg bg-white px-14 pt-4 shadow-lg">
          <RegexChecker
            props={{
              regex,
              handleChangeLanguage,
              handleTextChange,
              handleOptionChange,
              handleChangeCheckTarget
          } as IRegexChecker}
          />
          <RegexSave
            props={{
              regex,
              setRegex,
              onSubmitCallback,
              loginShowModal,
              setLoginShowModal,
              handleRegexClear,
              isOpenAddModal,
              isOpenEditModal,
              isOpenDeleteModal,
              onAddSubmit,
              onAddClose,
              onEditSubmit,
              onEditClose,
              onDeleteSubmit,
              onDeleteClose,
              handleTitleChange,
              handleTagChange,
              handleTagsAdd,
              handleTagsDelete,
              handleSupplementChange,
              handleAdd,
              handleEdit,
              handleDelete,
            } as IRegexSaveProps}
          />
          <hr className="mt-7 border-gray-300" />
          <RegexList
              regexes={ownRegexes}
              recommendRegexes={recommendRegexes}
              handleRegexEdit={handleRegexEdit}
              handleLike={handleLike}
              handleDisLike={handleDisLike}
          />
        </StyledRegexContent>
      </StyledRegexWhole>
    </div>
  )
}
