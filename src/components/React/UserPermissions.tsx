import { Bot } from "../../../types";
import { useEffect, useState } from "react";
import ReactChip from "@astralservices/react-chip";

export default function UserPermissions({
  permissions,
}: {
  permissions: Bot["permissions"];
}) {
  const [perms, setPerms] = useState(permissions);
  const [selectedUser, setSelectedUser] = useState("");

  return (
    <>
      <div className="grid grid-cols-5 col-span-full">
        <div className="flex rounded-l-md shadow-sm col-span-4">
          <span className="inline-flex items-center px-3 text-white rounded-l-md bg-black-400 sm:text-sm">
            @
          </span>
          <input
            id="user"
            name="user"
            type="text"
            className="flex-1 block w-full min-w-0 px-1 py-2 border-none rounded-none bg-black-400 sm:text-sm"
            onChange={(e) => {
              setSelectedUser(e.target.value);
            }}
          />
        </div>
        <button
          type="button"
          className="bg-astral rounded-r-md text-white font-bold px-4 py-2"
          onClick={() => {
            setPerms((p) => ({
              ...p,
              users: {
                ...p.users,
                [selectedUser]: [],
              },
            }));
          }}
        >
          Add
        </button>
      </div>

      {perms.users &&
        Object.entries(perms.users).map(([user, perm], i) => (
          <div className="grid grid-cols-7 col-span-full">
            <div className="flex shadow-sm md:col-span-2 col-span-full rounded-md">
              <span className="inline-flex items-center px-3 text-white rounded-l-md rounded-bl-none md:rounded-bl-md bg-black-400 sm:text-sm">
                ID
              </span>
              <p className="flex-1 flex items-center w-full min-w-0 px-2 py-2 border-none md:rounded-none rounded-r-md rounded-br-none bg-black-400 sm:text-sm truncate">
                {user}
              </p>
            </div>

            <div className="md:col-span-4 col-span-full">
              <ReactChip
                defaultChips={perm}
                id={`role-permissions-${i}`}
                name={`permissions.users.${user}`}
                labelClass="bg-black-300 flex flex-wrap rounded-r-md"
                inputClass="bg-black-300 text-white px-3 py-2 border-none w-full"
                chipClass="bg-black-400 text-white hover:bg-black-500 transition duration-200 p-2 rounded-md m-2"
                focusClass="bg-black-500"
                // regex should match the domain syntax ((+/-)astral.{category or *}.{command or *})
                regex={/^(\+|-)?astral\.(?:\*|[\w-]+)\.(?:\*|[\w-]+)$/}
                onChange={(chips) => {
                  setPerms((p) => ({
                    ...p,
                    users: {
                      ...p.users,
                      [user]: chips,
                    },
                  }));
                }}
              />
            </div>

            <button
              type="button"
              className="bg-astral md:rounded-r-md rounded-b-md md:rounded-bl-none text-white font-bold px-4 py-2 md:col-span-1 col-span-full"
              onClick={() => {
                setPerms((p) => {
                  const newPerms = { ...p };
                  delete newPerms.users[user];
                  return newPerms;
                });

                setSelectedUser("");
              }}
            >
              Remove
            </button>
          </div>
        ))}
    </>
  );
}
