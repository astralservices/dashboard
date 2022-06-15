import { Fragment, useEffect, useState } from "react";
import { Transition, Listbox } from "@headlessui/react";
import { SelectorIcon, CheckIcon } from "@heroicons/react/outline";
import { Workspace } from "../../types";
import { PlusCircleIcon } from "@heroicons/react/solid";
import { GetWorkspace, SetWorkspace } from "../../utils/user";

export default function WorkspaceDropdown({
  workspaces,
}: {
  workspaces: Workspace[];
}) {
  const workspace = GetWorkspace() || workspaces[0];
  const handleSelect = (w: Workspace) => {
    if (!w) {
      window.location.href = "/new";
      return;
    }
    SetWorkspace(w);
  };

  return (
    <div className="w-full">
      <Listbox value={workspace} onChange={handleSelect}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left border border-gray-300 rounded-lg cursor-default dark:border-black-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-astral sm:text-sm">
            <span className="grid items-center grid-cols-4 gap-1 font-bold text-black truncate dark:text-white md:grid-cols-3 md:gap-4">
              <img
                src={workspace?.logo ?? "/img/Logo.png"}
                className={`w-12 h-12 col-span-1 rounded-full ${
                  workspace?.logo ? "" : "filter grayscale"
                }`}
              />
              {workspace ? (
                <span className="grid col-span-2">
                  {workspace.name}
                  <span className="text-xs font-normal text-black-200 dark:text-gray-100">
                    Workspace
                  </span>
                </span>
              ) : (
                "Select a Workspace..."
              )}
            </span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <SelectorIcon
                className="w-5 h-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-gray-100 rounded-md shadow-lg dark:bg-black-200 max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {workspaces &&
                workspaces.map((workspace, i) => (
                  <Listbox.Option
                    key={i}
                    className={({ active }) =>
                      `cursor-default select-none relative py-2 px-4 dark:text-white text-black ${
                        active && "dark:bg-black-200 bg-gray-200"
                      }`
                    }
                    value={workspace}
                  >
                    {({ selected }) => (
                      <div className="grid items-center grid-cols-8">
                        <span
                          className={`flex items-center col-span-${
                            workspace.pending ? 6 : 7
                          } gap-4 font-bold truncate text-ellipsis`}
                        >
                          <img
                            src={workspace.logo ?? "/img/Logo.png"}
                            className={`w-12 h-12 col-span-1 rounded-full ${
                              workspace.logo ? "" : "filter grayscale"
                            }`}
                          />
                          {workspace.name}
                        </span>
                        {workspace.pending && (
                          <span className="inline-flex items-center justify-center text-center px-2 py-0.5 w-full col-span-2 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                            Invited
                          </span>
                        )}
                        {selected ? (
                          <span className="flex items-center justify-end w-full col-span-1 text-astral">
                            <CheckIcon className="w-5 h-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </div>
                    )}
                  </Listbox.Option>
                ))}

              <Listbox.Option
                className={({ active }) =>
                  `cursor-default select-none relative py-2 px-4 dark:text-white text-black ${
                    active && "dark:bg-black-300 bg-gray-200"
                  }`
                }
                value={null}
              >
                {({ selected }) => (
                  <div className="grid items-center grid-cols-8">
                    <span className="flex items-center col-span-7 gap-4 font-bold truncate text-ellipsis">
                      <PlusCircleIcon className="w-12 h-12 text-black dark:text-white" />
                      Create new
                    </span>
                    {selected ? (
                      <span className="flex items-center justify-end w-full col-span-1 text-astral">
                        <CheckIcon className="w-5 h-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </div>
                )}
              </Listbox.Option>
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
