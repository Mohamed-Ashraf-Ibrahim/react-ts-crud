import { Dialog, DialogPanel, DialogTitle, Transition, Button } from "@headlessui/react";
import { Fragment, useState } from "react";

const Modal = () => {
  const [isOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <Button
        onClick={openModal}
        className="rounded-md bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 transition"
      >
        Open Modal
      </Button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          {/* BACKDROP */}
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
          </Transition.Child>

          {/* MODAL CONTENT */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl transition-all">
                <DialogTitle className="text-lg font-semibold text-gray-900">
                  Payment Successful
                </DialogTitle>
                <p className="mt-2 text-sm text-gray-600">
                  Your payment has been successfully submitted. We’ve sent you an
                  email with all of the details.
                </p>
                <div className="mt-4 flex justify-end">
                  <Button
                    onClick={closeModal}
                    className="rounded-md bg-gray-800 px-4 py-2 text-sm text-white hover:bg-gray-700 transition"
                  >
                    Got it, thanks!
                  </Button>
                </div>
              </DialogPanel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Modal;
