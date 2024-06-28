/*
 * Copyright (C) 2020-2024 CZ.NIC z.s.p.o. (https://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React, { useEffect } from "react";

import {
    API_STATE,
    ErrorMessage,
    Spinner,
    useAPIGet,
    formFieldsSize,
} from "foris";
import PropTypes from "prop-types";

import { PENDING_STORAGE_STATES } from "./constants";
import CurrentState from "./currentState/CurrentState";
import DrivesOperations from "./DrivesOperations";
import useStorageState from "./hooks";
import API_URLs from "../API";

Storage.propTypes = {
    ws: PropTypes.object.isRequired,
};

const HELP_TEXT = _(`
<p>Here you can set up where your persistent data should be stored.
If you want to use Nextcloud, LXC or other IO-intensive applications,
don't put them on internal flash, but always use external storage.
Also, make sure that your data will fit on the new drive before switching.</p>
<p>To set up external storage, you have to connect an external drive - like
an USB flash drive - and format it to Btrfs filesystem. All you have to do is
select the correct drive, the desired RAID level and click "Format & Set"
button in "Prepare storage" section. This will format the drive and will
ask you to reboot the router. During the reboot your /srv (directory
where all IO-intensive applications should reside) will get moved to this
new drive.</p>
<p>If you already have a device that you used with the Turris router before,
you can set it to be used as external storage in "Drive selection" section
without losing any data.</p>
`);

export default function Storage({ ws }) {
    const [getDrivesResponse, getDrives] = useAPIGet(API_URLs.drives);
    const [getSettingsResponse, getSettings] = useAPIGet(API_URLs.settings);
    const [storageState, getStorageState] = useStorageState(ws, getDrives);

    useEffect(() => {
        getDrives();
        getSettings();
    }, [getDrives, getSettings]);

    const updateUUIDCallback = () => {
        getDrives();
        getSettings();
        getStorageState();
    };

    let componentContent = null;
    if (
        storageState.state === API_STATE.ERROR ||
        getDrivesResponse.state === API_STATE.ERROR ||
        getSettingsResponse.state === API_STATE.ERROR
    ) {
        componentContent = <ErrorMessage />;
    } else if (
        storageState.state !== API_STATE.SUCCESS ||
        getDrivesResponse.state !== API_STATE.SUCCESS ||
        getSettingsResponse.state !== API_STATE.SUCCESS
    ) {
        componentContent = <Spinner />;
    } else {
        const storageIsPending =
            Object.keys(PENDING_STORAGE_STATES).includes(
                storageState.data.state
            ) || storageState.data.blocking;

        componentContent = (
            <div className={`${formFieldsSize}`}>
                <CurrentState
                    storageIsPending={storageIsPending}
                    {...storageState.data}
                    disk_mounted={getSettingsResponse.data.disk_mounted}
                />
                <DrivesOperations
                    drives={getDrivesResponse.data.drives}
                    currentUUID={storageState.data.uuid}
                    storageIsPending={storageIsPending}
                    updateUUIDCallback={updateUUIDCallback}
                />
            </div>
        );
    }

    return (
        <>
            <h1>{_("Storage")}</h1>
            <div dangerouslySetInnerHTML={{ __html: HELP_TEXT }} />
            {componentContent}
        </>
    );
}
