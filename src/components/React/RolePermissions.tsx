import { Bot } from "../../../types";
import { useState } from "react";
import ReactChip from "@astralservices/react-chip";

export default function RolePermissions({
  roles,
  permissions,
}: {
  roles: any[];
  permissions: Bot["permissions"];
}) {
  // put the @everyone role at the bottom
  roles.sort((a, b) => {
    if (a.name === "@everyone") return 1;
    if (b.name === "@everyone") return -1;
    return 0;
  });

  const [perms, setPerms] = useState(permissions);
  const [selectedRole, setSelectedRole] = useState(roles[0].id);

  // remove roles that are in the permissions object
  const [availableRoles, setAvailableRoles] = useState(
    roles.filter((role) => {
      return !Object.keys(perms.roles ?? {}).includes(role.id);
    })
  );

  return (
    <>
      <div className="grid grid-cols-5 col-span-full">
        <div className="flex rounded-l-md shadow-sm col-span-4">
          <span className="inline-flex items-center px-3 text-white rounded-l-md bg-black-400 sm:text-sm">
            @
          </span>
          <select
            id="role"
            name="role"
            className="flex-1 block w-full min-w-0 px-1 py-2 border-none rounded-none bg-black-400 sm:text-sm"
            onChange={(e) => {
              setSelectedRole(e.target.value);
            }}
          >
            {availableRoles[0] &&
              availableRoles.map((role) => (
                <option value={role.id} selected={role.id === selectedRole.id}>
                  {role.name.replace("@", "")}
                </option>
              ))}
          </select>
        </div>
        <button
          type="button"
          className="bg-astral rounded-r-md text-white font-bold px-4 py-2"
          onClick={() => {
            setPerms((p) => ({
              ...p,
              roles: {
                ...p.roles,
                [selectedRole]: [],
              },
            }));

            setAvailableRoles((r) => {
              // remove the selected role from the available roles
              const newRoles = r.filter((role) => role.id !== selectedRole);
              // if there are no more roles, set the selected role to the first role
              if (newRoles.length === 0) setSelectedRole(roles[0].id);
              // if the selected role is not in the new roles, set the selected role to the first role
              else if (!newRoles.map((role) => role.id).includes(selectedRole))
                setSelectedRole(newRoles[0].id);
              return newRoles;
            });
          }}
        >
          Add
        </button>
      </div>

      {perms.roles &&
        Object.entries(perms.roles).map(([role, perm], i) => (
          <div className="grid grid-cols-5 col-span-full">
            <div className="flex shadow-sm md:col-span-1 col-span-full rounded-md">
              <span className="inline-flex items-center px-3 text-white rounded-l-md rounded-bl-none md:rounded-bl-md bg-black-400 sm:text-sm">
                @
              </span>
              <p className="flex-1 flex items-center w-full min-w-0 px-2 py-2 border-none md:rounded-none rounded-r-md rounded-br-none bg-black-400 sm:text-sm truncate">
                {roles.find((r) => r.id === role)?.name || role}
              </p>
            </div>

            <div className="md:col-span-3 col-span-full">
              <ReactChip
                defaultChips={perm}
                id={`role-permissions-${i}`}
                name={`permissions.roles.${role}`}
                labelClass="bg-black-300 flex flex-wrap rounded-r-md"
                inputClass="bg-black-300 text-white px-3 py-2 border-none w-full"
                chipClass="bg-black-400 text-white hover:bg-black-500 transition duration-200 p-2 rounded-md m-2"
                focusClass="bg-black-500"
                // regex should match the domain syntax ((+/-)astral.{category.{command or *} or *})
                // there could be like "+astral.*" or "+astral.category.*" or "+astral.category.command"
                // but not "+astral.category.command.subcommand" or "+astral.category"
                regex={/(\+|\-)?astral\.(?:\*|(?:(?:\w+|\*)\.(?:\*|\w+)))/}
                onChange={(chips) => {
                  setPerms((p) => ({
                    ...p,
                    roles: {
                      ...p.roles,
                      [role]: chips,
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
                  delete newPerms.roles[role];
                  return newPerms;
                });

                setAvailableRoles((r) => {
                  // add the role to the available roles
                  const newRoles = [...r, roles.find((r) => r.id === role)];
                  // if the selected role is not in the new roles, set the selected role to the first role
                  if (!newRoles.map((role) => role.id).includes(selectedRole))
                    setSelectedRole(newRoles[0].id);
                  return newRoles;
                });
              }}
            >
              Remove
            </button>
          </div>
        ))}
    </>
  );
}
