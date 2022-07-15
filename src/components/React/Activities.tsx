import {
  PencilIcon,
  TrashIcon,
  PlusIcon,
  CheckIcon,
  PuzzleIcon,
  SelectorIcon,
} from "@heroicons/react/outline/esm";
import { ActivitiesOptions } from "discord.js";
import { Bot } from "../../../types";
import { classNames } from "../../../utils/global";
import { useState, Fragment, Dispatch, SetStateAction, useRef } from "react";
import { Transition, Dialog, Listbox } from "@headlessui/react";

function BotActivity({
  activity,
  index,
  setBotData,
}: {
  activity: ActivitiesOptions;
  index: number;
  setBotData: Dispatch<SetStateAction<Bot>>;
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalActivity, setModalActivity] = useState(activity);

  return (
    <li key={activity.name}>
      <input
        type="hidden"
        className="hidden"
        name={`settings.activities[${index}][name]`}
        value={activity.name}
      />
      <input
        type="hidden"
        className="hidden"
        name={`settings.activities[${index}][type]`}
        value={activity.type}
      />
      <div className="block">
        <div className="flex items-center px-4 py-4 sm:px-6">
          <div className="flex-1 min-w-0 sm:flex sm:items-center sm:justify-between">
            <div className="truncate">
              <div className="flex text-sm">
                <p className="font-bold text-indigo-600 truncate">
                  {activity.type.toString().charAt(0).toUpperCase() +
                    activity.type.toString().slice(1).toLowerCase()}
                </p>
                <p className="flex-shrink-0 ml-1 font-normal text-gray-500 dark:text-white">
                  {activity.name}
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-shrink-0 ml-5">
            <button
              type="button"
              onClick={() => {
                setModalOpen(true);
              }}
              className="flex items-center justify-center w-6 h-6 rounded-md dark:hover:bg-black-200"
            >
              <PencilIcon className="w-4 h-4 text-black dark:text-white" />
            </button>
            <button
              type="button"
              onClick={() => {
                setBotData((bot) => ({
                  ...bot,
                  settings: {
                    ...bot.settings,
                    activities: [
                      ...bot.settings.activities.slice(0, index),
                      ...bot.settings.activities.slice(index + 1),
                    ],
                  },
                }));
              }}
              className="flex items-center justify-center w-6 h-6 rounded-md dark:hover:bg-black-200"
            >
              <TrashIcon className="w-4 h-4 text-black dark:text-white" />
            </button>
          </div>
        </div>
      </div>
      <EditActivityModal
        open={modalOpen}
        setOpen={setModalOpen}
        activity={modalActivity}
        setActivity={setModalActivity}
        onSave={() => {
          setBotData((bot) => ({
            ...bot,
            settings: {
              ...bot.settings,
              activities: [
                ...bot.settings.activities.slice(0, index),
                modalActivity,
                ...bot.settings.activities.slice(index + 1),
              ],
            },
          }));
        }}
      />
    </li>
  );
}

function EditActivityModal({
  open,
  setOpen,
  activity,
  setActivity,
  onSave,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  activity: any;
  setActivity: Dispatch<SetStateAction<any>>;
  onSave: (activity: any) => void;
}) {
  const cancelButtonRef = useRef(null);

  const types = ["PLAYING", "STREAMING", "LISTENING", "COMPETING", "WATCHING"];

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        initialFocus={cancelButtonRef}
        onClose={() => {
          setOpen(false);
        }}
      >
        <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75 dark:bg-black-400 dark:bg-opacity-50" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="relative inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl dark:bg-black-300 sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="px-4 pt-5 pb-4 bg-white dark:bg-black-300 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 mx-auto bg-green-100 rounded-full sm:mx-0 sm:h-10 sm:w-10">
                    <PuzzleIcon
                      className="w-6 h-6 text-green-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="w-full mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-semibold leading-6 text-gray-900 dark:text-white"
                    >
                      Edit Activity
                    </Dialog.Title>
                    <div className="grid grid-cols-1 grid-rows-3 mt-2 dark:text-white">
                      <div className="col-span-1">
                        <Listbox
                          value={activity.type}
                          onChange={(status) => {
                            setActivity({
                              ...activity,
                              type: status,
                            });
                          }}
                        >
                          {({ open }) => (
                            <>
                              <Listbox.Label className="block text-sm font-semibold text-gray-700 dark:text-white">
                                Type
                              </Listbox.Label>
                              <div className="relative mt-1">
                                <Listbox.Button className="relative w-full py-2 pr-10 text-left bg-white border border-gray-300 rounded-md shadow-sm cursor-default dark:bg-black-200 dark:border-none focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                  <div className="flex items-center">
                                    <span className="block ml-3 truncate">
                                      {activity.type
                                        .toString()
                                        .charAt(0)
                                        .toUpperCase() +
                                        activity.type
                                          .toString()
                                          .slice(1)
                                          .toLowerCase()}
                                    </span>
                                  </div>
                                  <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                    <SelectorIcon
                                      className="w-5 h-5 text-gray-400"
                                      aria-hidden="true"
                                    />
                                  </span>
                                </Listbox.Button>

                                <Transition
                                  show={open}
                                  as={Fragment}
                                  leave="transition ease-in duration-100"
                                  leaveFrom="opacity-100"
                                  leaveTo="opacity-0"
                                >
                                  <Listbox.Options className="absolute z-10 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg dark:bg-black-300 max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                    {types.map((type) => (
                                      <Listbox.Option
                                        key={type}
                                        className={({ active }) =>
                                          classNames(
                                            active
                                              ? "text-white bg-indigo-600"
                                              : "text-gray-900 dark:text-white",
                                            "cursor-default select-none relative py-2 pr-9"
                                          )
                                        }
                                        value={type}
                                      >
                                        {({ selected, active }) => (
                                          <>
                                            <div className="flex items-center">
                                              <span
                                                className={classNames(
                                                  selected
                                                    ? "font-semibold"
                                                    : "font-normal",
                                                  "ml-3 block truncate"
                                                )}
                                              >
                                                {type.charAt(0).toUpperCase() +
                                                  type.slice(1).toLowerCase()}
                                              </span>
                                            </div>

                                            {selected ? (
                                              <span
                                                className={classNames(
                                                  active
                                                    ? "text-white"
                                                    : "text-indigo-600",
                                                  "absolute inset-y-0 right-0 flex items-center pr-4"
                                                )}
                                              >
                                                <CheckIcon
                                                  className="w-5 h-5"
                                                  aria-hidden="true"
                                                />
                                              </span>
                                            ) : null}
                                          </>
                                        )}
                                      </Listbox.Option>
                                    ))}
                                  </Listbox.Options>
                                </Transition>
                              </div>
                            </>
                          )}
                        </Listbox>
                      </div>

                      <div className="col-span-1">
                        <label className="text-sm font-semibold">Name</label>
                        <div className="flex mt-1 rounded-md shadow-sm">
                          <div className="relative flex items-stretch flex-grow focus-within:z-10">
                            <input
                              type="text"
                              name="name"
                              id="name"
                              required
                              className="block w-full border-gray-300 rounded-md dark:border-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-black-200 sm:text-sm"
                              placeholder="a game"
                              defaultValue={activity.name}
                              onChange={(e) =>
                                setActivity({
                                  ...activity,
                                  name: e.target.value,
                                })
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-4 py-3 bg-gray-50 dark:bg-black-200 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white border border-transparent rounded-md shadow-sm bg-astral hover:bg-astral-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-astral-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => {
                    onSave(activity);
                    setOpen(false);
                  }}
                >
                  Save
                </button>
                <button
                  type="button"
                  className="inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setOpen(false)}
                  ref={cancelButtonRef}
                >
                  Cancel
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default function Activities({ bot }: { bot: Bot }) {
  const [botData, setBotData] = useState(bot);
  return (
    <div className="col-span-full">
      <p className="block text-sm font-semibold text-gray-700 dark:text-white">
        Activities
      </p>
      <ul
        role="list"
        className="border border-gray-200 divide-y divide-gray-200 rounded-md dark:border-none dark:divide-black-200 dark:bg-black-300"
      >
        {botData.settings.activities.map((activity, i) => (
          <BotActivity
            index={i}
            activity={activity}
            key={i}
            setBotData={setBotData}
          />
        ))}
        <li>
          <button
            type="button"
            onClick={() =>
              setBotData((bot) => ({
                ...bot,
                settings: {
                  ...bot.settings,
                  activities: [
                    ...bot.settings.activities,
                    {
                      name: "a game!",
                      type: "PLAYING",
                    },
                  ],
                },
              }))
            }
            className={classNames(
              bot.settings.activities.length > 0
                ? "rounded-b-md"
                : "rounded-md",
              "flex items-center justify-center w-full py-4 transition-colors duration-100 bg-gray-100 dark:bg-black-300 gap-x-2 dark:hover:bg-black-200 hover:bg-gray-200"
            )}
          >
            <PlusIcon className="w-4 h-4 text-gray-500 dark:text-white" />
            Create New
          </button>
        </li>
      </ul>

      <noscript>
        <div className="mt-1">
          <p className="text-sm text-black-700">
            You must enable Javascript to edit your bot's activites. You can
            also contact support to change it for you.
          </p>
        </div>
      </noscript>
    </div>
  );
}
