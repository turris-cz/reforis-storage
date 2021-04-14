/*
 * Copyright (C) 2020-2021 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React, { useEffect } from "react";
import PropTypes from "prop-types";
import {
    API_STATE,
    ErrorMessage,
    Spinner,
    useAPIGet,
    formFieldsSize,
} from "foris";

import API_URLs from "../API";
import CurrentState from "./currentState/CurrentState";
import useStorageState from "./hooks";
import { PENDING_STORAGE_STATES } from "./constants";
import DrivesOperations from "./DrivesOperations";

Storage.propTypes = {
    ws: PropTypes.object.isRequired,
};

const HELP_TEXT = _(`
<p>Here you can set up where your persistent data should be stored. If you want to use Nextcloud, LXC or other IO-intensive
applications, don't put them on internal flash, but always use external storage. Also, make sure that your data will fit
on the new drive before switching.</p>
<p>Once you choose a drive, it will be formatted to Btrfs filesystem and on next reboot, your /srv (directory where all
IO-intensive applications should reside) will get moved to this new drive.</p>
`);

export default function Storage({ ws }) {
    const [getDrivesResponse, getDrives] = useAPIGet(API_URLs.drives);
    const [getSettingsResponse, getSettings] = useAPIGet(API_URLs.settings);
    const [storageState, getStorageState] = useStorageState(ws, getDrives);
    useEffect(() => {
        getDrives();
        getSettings();
    }, [getDrives, getSettings]);

    if (
        storageState.state === API_STATE.ERROR ||
        getDrivesResponse.state === API_STATE.ERROR ||
        getSettingsResponse.state === API_STATE.ERROR
    ) {
        return <ErrorMessage />;
    }

    if (
        storageState.state !== API_STATE.SUCCESS ||
        getDrivesResponse.state !== API_STATE.SUCCESS ||
        getSettingsResponse.state !== API_STATE.SUCCESS
    ) {
        return <Spinner />;
    }

    const storageIsPending =
        Object.keys(PENDING_STORAGE_STATES).includes(storageState.data.state) ||
        storageState.data.blocking;

    function updateUUIDCallback() {
        getDrives();
        getSettings();
        getStorageState();
    }
    return (
        <>
            <h1>{_("Storage")}</h1>
            <div dangerouslySetInnerHTML={{ __html: HELP_TEXT }} />
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
        </>
    );
}
