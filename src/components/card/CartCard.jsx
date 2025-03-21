import React, { Fragment } from "react";
import { Trash2, Minus, Plus } from "lucide-react";
import useEcomstore from "../../store/ecom-store";
import { Link } from "react-router-dom";
import { numberFormat } from "../../utils/number";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

const CartCard = ({ open, onClose }) => {
  const carts = useEcomstore((state) => state.carts);
  const actionUpdateQuantity = useEcomstore(
    (state) => state.actionUpdateQuantity
  );
  const actionRemoveProduct = useEcomstore(
    (state) => state.actionRemoveProduct
  );
  const getTotalPrice = useEcomstore((state) => state.getTotalPrice);

  return (
    <Transition show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        {/* Overlay */}
        <div className="fixed inset-0 bg-gray-500/75" aria-hidden="true" />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">
                          Shopping cart
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            onClick={onClose}
                            className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                          >
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">
                          <ul role="list" className="-my-6 divide-y divide-gray-200">
                            {carts.map((item, index) => (
                              <li key={index} className="flex py-6">
                                <div className="shrink-0 overflow-hidden rounded-md border border-gray-200">
                                  {item.images.length > 0 ? (
                                    <img
                                      className="w-20 h-20 rounded-md object-cover"
                                      src={item.images[0].url}
                                      alt={item.title}
                                    />
                                  ) : (
                                    <div className="w-20 h-20 bg-gray-200 rounded-md flex items-center justify-center text-gray-600">
                                      No Image
                                    </div>
                                  )}
                                </div>

                                <div className="ml-4 flex flex-1 flex-col">
                                  <div>
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                      <h3>
                                        <p className="font-semibold text-lg">
                                          {item.title}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                          {item.description}
                                        </p>
                                      </h3>
                                      <p className="ml-4">
                                        {numberFormat(item.price * item.count)}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex flex-1 items-end justify-between text-sm">
                                    <div>
                                      <button
                                        onClick={() =>
                                          actionUpdateQuantity(
                                            item.id,
                                            item.count - 1
                                          )
                                        }
                                        className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300 transition duration-200"
                                      >
                                        <Minus size={18} />
                                      </button>
                                      <span className="px-4 font-semibold">
                                        {item.count}
                                      </span>
                                      <button
                                        onClick={() =>
                                          actionUpdateQuantity(
                                            item.id,
                                            item.count + 1
                                          )
                                        }
                                        className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300 transition duration-200"
                                      >
                                        <Plus size={18} />
                                      </button>
                                    </div>

                                    <div
                                      onClick={() => actionRemoveProduct(item.id)}
                                      className="flex"
                                    >
                                      <button
                                        type="button"
                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>{numberFormat(getTotalPrice())}</p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">
                        Shipping and taxes calculated at checkout.
                      </p>
                      <div className="mt-6">
                        <Link to="/cart">
                          <p onClick={onClose} className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-xs hover:bg-indigo-700">
                            Checkout
                          </p>
                        </Link>
                      </div>
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          or{" "}
                          <button
                            type="button"
                            onClick={onClose}
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                          >
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default CartCard;
