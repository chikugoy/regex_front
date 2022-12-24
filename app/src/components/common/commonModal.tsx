import React from 'react'
import Modal from 'react-modal'
import {CommonModalStyles} from "../Ruby/styled";

export const CommonModal: React.FC<{modalProps: ICommonModalProps}> = ({
  modalProps
}) => {
  return (
    <div>
      <Modal
        ariaHideApp={false}
        style={CommonModalStyles}
        isOpen={modalProps.isOpenModal} >
        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
          <h3
            className="text-xl font-bold leading-6 text-gray-900"
            id="modal-title">
            {modalProps.title}
          </h3>
          <div className="my-5">
            <p className="whitespace-pre-line text-gray-500">
              {modalProps.message}
            </p>
          </div>
        </div>
        <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
          <button
            type="button"
            className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            onClick={modalProps.onClose}>
            {modalProps.closeButtonText ? modalProps.closeButtonText : 'Cancel'}
          </button>
          <button
            type="button"
            className={`${modalProps.isHiddenSubmit && 'hidden'} mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm`}
            onClick={modalProps.onSubmit}>
            OK
          </button>
        </div>
      </Modal>
    </div>
  )
}
