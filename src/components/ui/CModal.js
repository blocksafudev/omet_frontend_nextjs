import React, { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { FaTimes } from "react-icons/fa";
import { CButton } from "@/components/ui/CButton";
import { RiCloseLine } from "react-icons/ri";

export const CModal = ({
  show,
  size,
  title,
  children,
  onClose,
  onSubmit,
  submitTitle,
  isLoading,
  hideTitle = false,
}) => {
  // const [isOpen, setIsOpen] = useState(show)

  const closeModal = () => {
    // setIsOpen(false)
    onClose && onClose(false);
  };

  // useEffect(() => {
  //     // setIsOpen(show)
  // }, [show])

  const getSize = () => {
    if (!size) return "md:w-1/2 lg:w-1/2 xl:w-1/2 w-full";
    if (size === "sm") return "md:w-1/3 lg:w-1/3 xl:w-1/3 w-full";
    if (size === "md") return "md:w-1/2 lg:w-1/2 xl:w-1/2 w-full";
    if (size === "lg") return "md:w-3/4 lg:w-3/4 xl:w-3/4 w-full";
    if (size === "xl") return "md:w-4/5 lg:w-4/5 xl:w-4/5 w-full";
  };

  return (
    <>
      <Transition appear show={show} as={Fragment} className={"w-full"}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            className={"w-full"}
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 w-full overflow-y-auto">
            <div className="flex items-center justify-center w-full min-h-full p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
                className={`${getSize()} justify-center flex items-center`}
              >
                <Dialog.Panel
                  className={`${getSize()} flex flex-col transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all`}
                >
                  {!hideTitle && (
                    <Dialog.Title
                      as="h3"
                      className={`w-full text-lg font-medium leading-6 text-gray-900 flex justify-between align-middle mb-2 pb-2`}
                    >
                      <div>{title}</div>
                      {onClose && (
                        <div>
                          <button
                            type={"button"}
                            onClick={() => {
                              closeModal();
                            }}
                          >
                            <RiCloseLine className={"text-gray-500 w-6 h-6"} />
                          </button>
                        </div>
                      )}
                    </Dialog.Title>
                  )}
                  {/*    region body */}
                  <div className={"w-full"}>{children}</div>
                  {/*    endregion */}

                  {/*    region footer*/}
                  {onSubmit && (
                    <div
                      className={
                        "mt-4 border-t pt-3 flex justify-between w-full"
                      }
                    >
                      <CButton
                        title={submitTitle || "Submit"}
                        onClick={onSubmit}
                        isLoading={isLoading}
                      />
                    </div>
                  )}
                  {/*    endregion*/}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
