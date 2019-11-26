/*
 * Copyright (C) 2019 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React, { useEffect } from "react";
import {
    API_STATE, ErrorMessage, Spinner, useAPIGet,
} from "foris";

import API_URLs from "../API";

import Drives from "./Drives/Drives";
import CurrentState from "./CurrentState";
import useStorageState from "./hooks";
import UUIDs from "./UUIDs/UUIDs";
import { PENDING_STORAGE_STATES } from "./constants";

const HELP_TEXT = _(`
Here you can set up where your persistent data should be stored. If you want to use Nextcloud, LXC or other IO-intensive
applications, don't put them on internal flash, but always use external storage. Also, make sure that your data will fit
on the new drive before switching.
</br></br>
Once you choose a drive, it will be formatted to Btrfs filesystem and on next reboot, your /srv (directory where all
IO-intensive applications should reside) will get moved to this new drive.
`);

export default function Storage({ ws }) {
    const [getDrivesStatus, getDrives] = useAPIGet(API_URLs.drives);
    const storageState = useStorageState(ws, getDrives);
    useEffect(() => {
        getDrives();
    }, [getDrives]);

    if (storageState.state === API_STATE.ERROR || getDrivesStatus.state === API_STATE.ERROR) {
        return <ErrorMessage />;
    }
    if (storageState.state !== API_STATE.SUCCESS || getDrivesStatus.state !== API_STATE.SUCCESS) {
        return <Spinner />;
    }

    const storageIsPending = Object.keys(PENDING_STORAGE_STATES).includes(storageState.data.state)
        || storageState.data.blocking;

    return (
        <>
            <h1>{_("Storage")}</h1>
            <p dangerouslySetInnerHTML={{ __html: HELP_TEXT }} />

            <h3>{_("Current state")}</h3>
            <CurrentState
                storageIsPending={storageIsPending}
                {...storageState.data}
            />

            {getDrivesStatus.data.drives.length === 0
                ? (<p>{_("No drives connected, please connect a drive and refresh the page.")}</p>)
                : (
                    <>
                        <h3>{_("Prepare drives")}</h3>
                        <Drives
                            drives={getDrivesStatus.data.drives}
                            currentUUID={storageState.data.uuid}
                            storageIsPending={storageIsPending}
                        />

                        <h3>{_("Use prepared storage")}</h3>
                        <UUIDs
                            drives={getDrivesStatus.data.drives}
                            currentUUID={storageState.data.uuid}
                            storageIsPending={storageIsPending}
                        />
                    </>
                )}
        </>
    );
}
