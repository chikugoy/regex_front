import React, {useContext} from 'react'
import 'react-tabs/style/react-tabs.css'
import {Loading} from "../../common/loading"
import {useFormatDatetime} from "../hock/useFormatDatetime"
import {useReplaceMatchHtml} from "../hock/useReplaceMatchHtml"
import {useGetMatchColor} from "../hock/useGetMatchColor"
import {BsHeartFill, BsHeart} from 'react-icons/bs'
import {userContext} from "../../../userProvider";

export const RegexListCommon: React.FC<{
  regexes: IRegex[],
  handleRegexEdit?: (regexes: IRegex[], regexId: string | undefined) => void,
  handleLike: (regexes: IRegex[], regexId: string | undefined) => void,
  handleDisLike: (regexes: IRegex[], regexId: string | undefined) => void,
  isCanEdit?: boolean,
}> = ({regexes, handleRegexEdit, handleLike, handleDisLike, isCanEdit = false}) => {
  const useUserContext = () => useContext(userContext)
  const user = useUserContext()
  const formatDatetime = useFormatDatetime
  const replaceMatchHtml = useReplaceMatchHtml
  const getMatchColor = useGetMatchColor

  const replaceBr = (msg: string) => {
    const texts = msg.split("\n").map((item, index) => {
      return (
        <React.Fragment key={index}>{item}<br/></React.Fragment>
      );
    });
    return <div>{texts}</div>;
  }

  return (
    <div>
      {!regexes &&
          <div className="mt-10 flex w-full items-center justify-center">
              <Loading/>
          </div>
      }
      <div>
        {regexes && regexes?.map((regex, i) => {
          return (
            <div key={regex.id}
                 className={`${(i > 0) ? 'pt-5' : 'pt-3'} hover:bg-gray-100`}
            >
              <div className="px-3">
                <div className="my-2 flex">
                  <div className="text-lg font-bold">
                    {regex.title}
                  </div>
                  <div className="ml-auto">
                    <span
                      className="cursor-pointer text-sm text-sky-500"
                      data-hs-collapse={`#hs-basic-collapse-heading-own-${i}`}
                    >
                      詳細
                    </span>
                    {isCanEdit && handleRegexEdit &&
                      <span className="ml-3 cursor-pointer text-sm text-sky-500"
                            onClick={() => handleRegexEdit(regexes, regex.id)}>
                        編集
                      </span>
                    }
                  </div>
                </div>
                <div className="flex">
                  <div className="pl-1 text-base">
                    <span className="mr-1">/</span><span>{regex.text}</span><span className="ml-1">/</span><span
                    className="ml-0.5 text-sm">{regex.option_text}</span>
                  </div>
                  <div className="ml-auto pt-1.5">
                    {!regex.good_user_ids?.includes(user.uid) ?
                      <div className="flex">
                        <BsHeart className="mt-0.5 h-4 w-4 text-gray-500 hover:text-red-400"
                                 onClick={() => handleLike(regexes, regex.id)}/>
                        <span className="ml-1 text-sm text-gray-400">{regex.good_user_count === 0 ? '' : regex.good_user_count}</span>
                      </div>
                      :
                      <div className="flex">
                        <BsHeartFill className="mt-0.5 h-4 w-4 text-red-400 hover:text-red-200"
                                     onClick={() => handleDisLike(regexes, regex.id)}/>
                        <span className="ml-1 text-sm text-gray-400">{regex.good_user_count === 0 ? '' : regex.good_user_count}</span>
                      </div>
                    }
                  </div>
                </div>
                {/* eslint-disable-next-line tailwindcss/no-contradicting-classname */}
                <div id={`hs-basic-collapse-heading-own-${i}`}
                     className="hs-collapse mt-2 mb-5 hidden w-full overflow-hidden transition-[height] duration-300"
                     aria-labelledby="hs-basic-collapse">
                  {regex.supplement &&
                      <div className="break-all pl-1">
                        {replaceBr(regex.supplement)}
                      </div>
                  }
                  <div className="flex">
                    <div className="flex-1 pr-2">
                        <textarea
                          disabled={true}
                          value={regex.check_targets.length > 0 ? regex.check_targets[0].target : ''}
                          placeholder="チェック対象の文字列"
                          className="mt-2 block h-36 w-full rounded border border-gray-300 bg-white p-2 shadow focus:outline-none focus:ring-2 focus:ring-sky-500"
                        ></textarea>
                    </div>
                    <div className="flex-1 pl-2">
                      <div
                        dangerouslySetInnerHTML={{__html: replaceMatchHtml(regex.check_targets[0])}}
                        className={`${getMatchColor(regex.check_targets[0])} regex_strong mt-2 block h-36 w-full overflow-y-auto break-all rounded border border-gray-300 p-2 shadow`}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="mt-3">
                  <div className="flex">
                    <div className="flex max-w-md flex-wrap">
                      {regex.tags && regex.tags?.map((tag, j) => {
                        return (
                          <div key={j} className="mb-2">
                            {tag &&
                              <span
                                className="mr-2 mb-2 rounded bg-teal-400 px-2 py-1.5 text-sm font-bold text-white"
                                key={j}>
                                {tag}
                              </span>
                            }
                          </div>
                        )
                      })}
                    </div>
                    <div className="ml-auto text-sm text-gray-400">
                      {formatDatetime(regex.updated_at)}
                    </div>
                  </div>
                </div>
              </div>
              {i < regexes.length - 1 && <hr className="mt-5 border-gray-300"/>}
            </div>
          )
        })}
      </div>
    </div>
  )
}
