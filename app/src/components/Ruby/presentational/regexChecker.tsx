import React, {useState} from 'react'
import {HiQuestionMarkCircle} from 'react-icons/hi'
import {QuestionModal} from './questionModal'
import {useReplaceMatchHtml} from '../hock/useReplaceMatchHtml'
import {useGetMatchColor} from '../hock/useGetMatchColor'

export interface IRegexChecker {
  regex: IRegex,
  handleChangeLanguage: () => void,
  handleOptionChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  handleTextChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  handleChangeCheckTarget: (e: React.ChangeEvent<HTMLTextAreaElement>, i: number) => void,
}

export const RegexChecker: React.FC<{props: IRegexChecker}> = (props) => {
  const [questionShowModal, setQuestionShowModal] = useState<boolean>(false);
  const replaceMatchHtml = useReplaceMatchHtml
  const getMatchColor = useGetMatchColor

  const handleOpenQuestionModal = () => {
    setQuestionShowModal(true)
  }

  const {
    regex,
    handleChangeLanguage,
    handleOptionChange,
    handleTextChange,
    handleChangeCheckTarget
  } = props.props

  return (
    <div className="mb-7">
      <QuestionModal
        questionShowModal={questionShowModal}
        setQuestionShowModal={setQuestionShowModal}
        handleChangeLanguage={handleChangeLanguage}/>
      <label className="mt-5 block font-bold text-gray-700">
        チェックしたい正規表現
      </label>
      <div className="flex items-center">
        <span className="mr-3 inline-block text-xl">
          /
        </span>
        <input
          type="text"
          value={regex.text}
          onChange={handleTextChange}
          placeholder="正規表現を入力"
          className="mt-2 inline-block h-12 grow rounded border border-gray-300 px-3 shadow focus:outline-none focus:ring-2 focus:ring-sky-500"
        />
        <span className="mx-3 inline-block text-xl">
          /
        </span>
        <input
          type="text"
          value={regex.option_text}
          onChange={handleOptionChange}
          placeholder="i m x"
          className="mt-2 inline-block h-12 w-16 rounded border border-gray-300 px-3 shadow focus:outline-none focus:ring-2 focus:ring-sky-500"
        />
        <HiQuestionMarkCircle onClick={handleOpenQuestionModal}
                              className="ml-1 mt-2 h-9 w-9 text-sky-500 hover:text-sky-600"/>
      </div>
      <div>
        <div className="flex">
          <div className="flex-1 pr-2">
            <label className="mt-5 block font-bold text-gray-700">
              チェック対象の文字列
            </label>
          </div>
          <div className="flex-1 pl-2">
            <label className="mt-5 inline-block font-bold text-gray-700">結果</label>
            <span className="regex_strong ml-2 inline-block text-xs font-normal text-gray-700">(マッチした文字列を<strong>赤字</strong>で表示します)</span>
          </div>
        </div>
        {(regex.check_targets || []).map((checkTarget, i) => {
          return (
            <div key={i} className="flex">
              <div className="flex-1 pr-2">
                <textarea
                  value={checkTarget.target}
                  onChange={(e) => {
                    handleChangeCheckTarget(e, i)
                  }}
                  placeholder="チェック対象の文字列"
                  className="mt-2 block h-36 w-full rounded border border-gray-300 p-2 shadow focus:outline-none focus:ring-2 focus:ring-sky-500"
                ></textarea>
              </div>
              <div className="flex-1 pl-2">
                <div
                  dangerouslySetInnerHTML={{__html: replaceMatchHtml(checkTarget)}}
                  className={`${getMatchColor(checkTarget)} regex_strong mt-2 block h-36 w-full overflow-y-auto break-all rounded border border-gray-300 p-2 shadow`}
                ></div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
