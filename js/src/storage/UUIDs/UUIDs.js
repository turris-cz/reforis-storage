/*
 * Copyright (C) 2019 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React, { useState } from "react";

import { Button, useAPIPost } from "foris";
import { filterNonBTRFS, groupDrivesByUUIDs } from "../utils";
import API_URLs from "../../API";
import UUIDsTable from "./UUIDsTable";

export default function UUIDs({ drives, currentUUID, storageIsPending }) {
    const [selectedUUID, setSelectedUUID] = useState(currentUUID);

    const [postUpdateSrvStatus, postUpdateSrv] = useAPIPost(API_URLs.updateSrv);

    function updateSrv(e) {
        e.preventDefault();
        postUpdateSrv({ uuid: selectedUUID });
    }

    const drivesByUUIDs = groupDrivesByUUIDs(filterNonBTRFS(drives));

    if (Object.keys(drivesByUUIDs).length === 0) {
        return <p>{_("There aren't prepared drives to be used.")}</p>;
    }

    return (
        <form onSubmit={updateSrv}>
            <UUIDsTable
                drivesByUUIDs={drivesByUUIDs}
                selectedUUID={selectedUUID}
                setSelectedUUID={setSelectedUUID}
                storageIsPending={storageIsPending}
            />
            <Button
                type="submit"
                forisFormSize
                disabled={storageIsPending}
            >
                {_("Select UUID")}
            </Button>
        </form>
    );
}
