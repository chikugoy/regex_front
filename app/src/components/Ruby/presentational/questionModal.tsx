import React from 'react'
import Modal from 'react-modal'
import { HiOutlineX } from "react-icons/hi"
import {CommonModalStyles, StyledQuestionModal} from "../styled";

export const QuestionModal: React.FC<{
  questionShowModal: boolean,
  setQuestionShowModal: React.Dispatch<React.SetStateAction<boolean>>,
  handleChangeLanguage: () => void
}> = ({ questionShowModal, setQuestionShowModal, handleChangeLanguage}) => {
  const handleCloseQuestionModal = () => {
    setQuestionShowModal(false)
  }

  return (
    <div>
      <Modal
        ariaHideApp={false}
        style={CommonModalStyles}
        isOpen={questionShowModal} >
        <StyledQuestionModal>
          <div className="mt-3 overflow-y-auto text-center sm:mt-0 sm:ml-4 sm:text-left">
            <h3
              className="mb-5 text-center text-xl font-bold leading-6 text-gray-900"
              id="modal-title">
              Ruby 正規表現リファレンス
            </h3>
            <HiOutlineX onClick={handleCloseQuestionModal} className="absolute right-4 top-5 h-6 w-6" />
            <div className="mt-2 text-sm text-gray-500">
              <div className="flex h-full">
                <div className="relative overflow-x-auto">
                  <table className="w-full text-left text-sm text-gray-500">
                    <tbody>
                    <tr className="border-y bg-white">
                      <th scope="row" className="whitespace-nowrap py-4 px-6 font-medium text-gray-900">
                        [abc]
                      </th>
                      <td className="py-4 px-6">
                        a、または b、または c の文字
                      </td>
                    </tr>
                    <tr className="border-b bg-white">
                      <th scope="row" className="whitespace-nowrap py-4 px-6 font-medium text-gray-900">
                        [^abc]
                      </th>
                      <td className="py-4 px-6">
                        a、b、c を除く任意の文字
                      </td>
                    </tr>
                    <tr className="border-b bg-white">
                      <th scope="row" className="whitespace-nowrap py-4 px-6 font-medium text-gray-900">
                        [a-z]
                      </th>
                      <td className="py-4 px-6">
                        az の範囲の任意の文字
                      </td>
                    </tr>
                    <tr className="border-b bg-white">
                      <th scope="row" className="whitespace-nowrap py-4 px-6 font-medium text-gray-900">
                        [a-zA-Z]
                      </th>
                      <td className="py-4 px-6">
                        az または Az の範囲の任意の 1 文字
                      </td>
                    </tr>
                    <tr className="border-b bg-white">
                      <th scope="row" className="whitespace-nowrap py-4 px-6 font-medium text-gray-900">
                        ^
                      </th>
                      <td className="py-4 px-6">
                        行頭
                      </td>
                    </tr>
                    <tr className="border-b bg-white">
                      <th scope="row" className="whitespace-nowrap py-4 px-6 font-medium text-gray-900">
                        $
                      </th>
                      <td className="py-4 px-6">
                        行の終わり
                      </td>
                    </tr>
                    <tr className="border-b bg-white">
                      <th scope="row" className="whitespace-nowrap py-4 px-6 font-medium text-gray-900">
                        \A
                      </th>
                      <td className="py-4 px-6">
                        文字列の開始
                      </td>
                    </tr>
                    <tr className="border-b bg-white">
                      <th scope="row" className="whitespace-nowrap py-4 px-6 font-medium text-gray-900">
                        \z
                      </th>
                      <td className="py-4 px-6">
                        文字列の終わり
                      </td>
                    </tr>
                    <tr className="border-b bg-white">
                      <th scope="row" className="whitespace-nowrap py-4 px-6 font-medium text-gray-900">
                        .
                      </th>
                      <td className="py-4 px-6">
                        任意の 1 文字
                      </td>
                    </tr>
                    <tr className="border-b bg-white">
                      <th scope="row" className="whitespace-nowrap py-4 px-6 font-medium text-gray-900">
                        \s
                      </th>
                      <td className="py-4 px-6">
                        任意の空白文字
                      </td>
                    </tr>
                    <tr className="border-b bg-white">
                      <th scope="row" className="whitespace-nowrap py-4 px-6 font-medium text-gray-900">
                        \S
                      </th>
                      <td className="py-4 px-6">
                        非空白文字
                      </td>
                    </tr>
                    <tr className="border-b bg-white">
                      <th scope="row" className="whitespace-nowrap py-4 px-6 font-medium text-gray-900">
                        \d
                      </th>
                      <td className="py-4 px-6">
                        0進数字 [0-9]
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </div>
                <div className="relative overflow-x-auto">
                  <table className="w-full text-left text-sm text-gray-500">
                    <tbody>
                    <tr className="border-y bg-white">
                      <th scope="row" className="whitespace-nowrap py-4 px-6 font-medium text-gray-900">
                        \D
                      </th>
                      <td className="py-4 px-6">
                        非10進数字 [^0-9]
                      </td>
                    </tr>
                    <tr className="border-y bg-white">
                      <th scope="row" className="whitespace-nowrap py-4 px-6 font-medium text-gray-900">
                        \w
                      </th>
                      <td className="py-4 px-6">
                        任意の単語文字 (文字、数字、アンダースコア) [a-zA-Z0-9_]
                      </td>
                    </tr>
                    <tr className="border-b bg-white">
                      <th scope="row" className="whitespace-nowrap py-4 px-6 font-medium text-gray-900">
                        \W
                      </th>
                      <td className="py-4 px-6">
                        単語以外の任意の文字 [^a-zA-Z0-9_]
                      </td>
                    </tr>
                    <tr className="border-b bg-white">
                      <th scope="row" className="whitespace-nowrap py-4 px-6 font-medium text-gray-900">
                        \b
                      </th>
                      <td className="py-4 px-6">
                        任意の単語境界
                      </td>
                    </tr>
                    <tr className="border-b bg-white">
                      <th scope="row" className="whitespace-nowrap py-4 px-6 font-medium text-gray-900">
                        (...)
                      </th>
                      <td className="py-4 px-6">
                        丸括弧 ( ) によってキャプチャ
                      </td>
                    </tr>
                    <tr className="border-b bg-white">
                      <th scope="row" className="whitespace-nowrap py-4 px-6 font-medium text-gray-900">
                        (a|b)
                      </th>
                      <td className="py-4 px-6">
                        a または b
                      </td>
                    </tr>
                    <tr className="border-b bg-white">
                      <th scope="row" className="whitespace-nowrap py-4 px-6 font-medium text-gray-900">
                        ?
                      </th>
                      <td className="py-4 px-6">
                        0回もしくは1回
                      </td>
                    </tr>
                    <tr className="border-b bg-white">
                      <th scope="row" className="whitespace-nowrap py-4 px-6 font-medium text-gray-900">
                        *
                      </th>
                      <td className="py-4 px-6">
                        0回以上
                      </td>
                    </tr>
                    <tr className="border-b bg-white">
                      <th scope="row" className="whitespace-nowrap py-4 px-6 font-medium text-gray-900">
                        +
                      </th>
                      <td className="py-4 px-6">
                        1回以上
                      </td>
                    </tr>
                    <tr className="border-b bg-white">
                      <th scope="row" className="whitespace-nowrap py-4 px-6 font-medium text-gray-900">
                        {'{'}n{'}'}
                      </th>
                      <td className="py-4 px-6">
                        ちょうどn回(nは数字)
                      </td>
                    </tr>
                    <tr className="border-b bg-white">
                      <th scope="row" className="whitespace-nowrap py-4 px-6 font-medium text-gray-900">
                        {'{'}n,{'}'}
                      </th>
                      <td className="py-4 px-6">
                        n回以上(nは数字)
                      </td>
                    </tr>
                    <tr className="border-b bg-white">
                      <th scope="row" className="whitespace-nowrap py-4 px-6 font-medium text-gray-900">
                        {'{'}n,m{'}'}
                      </th>
                      <td className="py-4 px-6">
                        n回以上m回以下(n,mは数字)
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="mt-3 ml-5">
              <p className="text-sm text-gray-500">※Ruby のバージョンは v3.1.2 になります。</p>
              <p className="mt-2 text-sm text-gray-500">※Ruby 以外の言語切替は
                <span
                  onClick={handleChangeLanguage}
                  className="cursor-pointer font-bold text-sky-500">こちら</span>
                からどうぞ。
              </p>
            </div>
          </div>
          <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <button
              type="button"
              className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={handleCloseQuestionModal}>
              閉じる
            </button>
          </div>
        </StyledQuestionModal>
      </Modal>
    </div>
  )
}
