import React from 'react'
import {isEmpty} from 'lodash'
import {HiOutlineChevronDown, HiOutlineMinusCircle, HiOutlinePlusCircle} from 'react-icons/hi'
import {CommonModal} from '../../common/commonModal'
import {LoginModal} from './loginModal'
import {Toaster} from 'react-hot-toast'

export interface IRegexSaveProps {
  regex: IRegex,
  loginShowModal: boolean,
  setLoginShowModal: React.Dispatch<React.SetStateAction<boolean>>,
  handleRegexClear: () => void,
  isOpenAddModal: boolean,
  isOpenEditModal: boolean,
  isOpenDeleteModal: boolean,
  onAddSubmit: () => void,
  onAddClose: () => void,
  onEditSubmit: () => void,
  onEditClose: () => void,
  onDeleteSubmit: () => void,
  onDeleteClose: () => void,
  handleTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  handleTagChange: (e: React.ChangeEvent<HTMLInputElement>, i: number) => void,
  handleTagsAdd: () => void,
  handleTagsDelete: () => void,
  handleSupplementChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void,
  handleAdd: () => void,
  handleEdit: () => void,
  handleDelete: () => void,
}

export const RegexSave: React.FC<{
  props: IRegexSaveProps,
}> = (props) => {
  const {
    regex,
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
  } = props.props
  return (
    <div className="block">
      <Toaster/>
      <LoginModal loginShowModal={loginShowModal} setLoginShowModal={setLoginShowModal}/>
      <CommonModal modalProps={{
        title: '正規表現の保存確認',
        message: "チェックした正規表現を保存します。よろしいですか？\n(この処理はキャンセルできません)",
        isOpenModal: isOpenAddModal,
        onSubmit: onAddSubmit,
        onClose: onAddClose,
      } as ICommonModalProps}/>
      <CommonModal modalProps={{
        title: '正規表現の編集保存確認',
        message: "正規表現の編集を保存します。よろしいですか？\n(この処理はキャンセルできません)",
        isOpenModal: isOpenEditModal,
        onSubmit: onEditSubmit,
        onClose: onEditClose,
      } as ICommonModalProps}/>
      <CommonModal modalProps={{
        title: '正規表現の削除確認',
        message: "正規表現を削除します。よろしいですか？\n(この処理はキャンセルできません)",
        isOpenModal: isOpenDeleteModal,
        onSubmit: onDeleteSubmit,
        onClose: onDeleteClose,
      } as ICommonModalProps}/>
      <button id="hs-basic-collapse" type="button" data-hs-collapse="#hs-basic-collapse-heading"
              className="rounded-md bg-sky-500 py-2 px-4 text-white shadow-md hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-400">
        結果を{isEmpty(regex.id) ? '保存する' : '編集する'}
        <HiOutlineChevronDown className="ml-2 inline-block"/>
      </button>

      <div id="hs-basic-collapse-heading"
           className="hs-collapse hidden w-full overflow-hidden transition-[height] duration-300"
           aria-labelledby="hs-basic-collapse">
        <div className="mt-5 px-2">
          <label className="mt-5 block font-bold text-gray-700">
            正規表現タイトル
          </label>
          <input
            type="text"
            value={regex.title}
            onChange={handleTitleChange}
            placeholder="正規表現のタイトルを入力"
            className="mt-2 block h-12 w-full rounded border border-gray-300 px-3 shadow focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
          <label className="mt-5 block font-bold text-gray-700">
            タグ
          </label>
          <div className="mt-1 flex">
            <div className="flex grow flex-wrap">
              {(regex.tags || []).map((tag, i) => {
                return (
                  <input
                    key={i}
                    id="tag"
                    name="tag"
                    type="text"
                    value={tag}
                    onChange={(e) => {
                      handleTagChange(e, i)
                    }}
                    placeholder="タグを入力"
                    className={`${i >= 3 && 'mt-2'} mr-4 block h-12 w-32 rounded border border-gray-300 px-3 shadow  focus:outline-none focus:ring-2 focus:ring-sky-500`}
                  />
                )
              })}
            </div>
            <div className="flex justify-end">
              <HiOutlinePlusCircle
                onClick={handleTagsAdd} className="ml-3 h-12 w-8 text-gray-500 hover:text-gray-300"/>
              <HiOutlineMinusCircle
                onClick={handleTagsDelete}
                className={`${((regex.tags || []).length === 1) && 'hidden'} ml-2 h-12 w-8 text-gray-500 hover:text-gray-300`}/>
            </div>
          </div>
          <label className="mt-5 block font-bold text-gray-700">
            補足
          </label>
          <textarea
              value={regex.supplement}
              onChange={(e) => {
                handleSupplementChange(e)
              }}
              placeholder="補足"
              className="mt-2 block h-28 w-full rounded border border-gray-300 p-2 shadow focus:outline-none focus:ring-2 focus:ring-sky-500"
          ></textarea>
          {isEmpty(regex.id) ?
            <button type="button" onClick={handleAdd}
                    className="mt-5 rounded-md bg-sky-500 py-2 px-4 text-white shadow-md hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-400">
              保存する
            </button> :
            <div>
              <button type="button" onClick={handleRegexClear}
                      className="mt-5 rounded-md border border-gray-300 bg-white py-2 px-4 text-gray-500 shadow hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300">
                クリアする
              </button>
              <button type="button" onClick={handleEdit}
                      className="mt-5 ml-5 rounded-md bg-sky-500 py-2 px-4 text-white shadow-md hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-400">
                保存する
              </button>
              <button type="button" onClick={handleDelete}
                      className="mt-5 ml-5 rounded-md bg-red-500 py-2 px-4 text-white shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400">
                削除する
              </button>
            </div>
          }
        </div>
      </div>
    </div>
  )
}
