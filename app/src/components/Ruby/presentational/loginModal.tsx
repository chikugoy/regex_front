import React from 'react'
import Modal from 'react-modal'
import {ReactComponent as GoogleIcon} from "../../../images/google.svg"
import {GoogleAuthProvider, signInWithRedirect} from "firebase/auth"
import {auth} from "../../../firebase/firebase"
import {CommonModalStyles} from "../styled";

export const LoginModal: React.FC<{
  loginShowModal: boolean,
  setLoginShowModal: React.Dispatch<React.SetStateAction<boolean>>
}> = ({loginShowModal, setLoginShowModal}) => {
  const provider = new GoogleAuthProvider()
  const clickLogin = function () {
    signInWithRedirect(auth, provider)
  }

  const handleCloseQuestionModal = () => {
    setLoginShowModal(false)
  }

  return (
    <div>
      <Modal
        ariaHideApp={false}
        style={CommonModalStyles}
        isOpen={loginShowModal}>
        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
          <div>
            <div className="my-5 text-center font-bold text-gray-600">
              ログインすると保存した正規表現を後で確認することができます。
            </div>
            <div className="pb-5">
              <button
                className="m-auto mt-5 flex rounded-md border border-gray-200 py-2 px-4 text-center shadow hover:bg-gray-100 focus:outline-none"
                onClick={() => clickLogin()}>
                <GoogleIcon className="h-6 w-6"/>
                <span className="ml-1.5 mb-0.5 text-lg text-gray-500">Login with Google</span>
              </button>
            </div>
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
      </Modal>
    </div>
  )
}
