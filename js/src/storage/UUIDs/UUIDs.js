/*
 * Copyright (C) 2019 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
    Button, useAlert, useAPIPost, API_STATE,
} from "foris";

import { filterNonBTRFS, groupDrivesByUUIDs } from "../utils";
import API_URLs from "../../API";
import UUIDsTable from "./UUIDsTable";

UUIDs.propTypes = {
    drives: PropTypes.arrayOf(PropTypes.shape({
        dev: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        fs: PropTypes.string.isRequired,
        uuid: PropTypes.string.isRequired,
    })).isRequired,
    currentUUID: PropTypes.string.isRequired,
    storageIsPending: PropTypes.bool.isRequired,
};

UUIDs.defaultProps = {
    storageIsPending: false,
};

export default function UUIDs({ drives, currentUUID, storageIsPending }) {
    const [selectedUUID, setSelectedUUID] = useState(currentUUID);
    const [postUpdateSrvStatus, postUpdateSrv] = useAPIPost(API_URLs.updateSrv);
    const [setAlert] = useAlert();
    useEffect(() => {
        if (postUpdateSrvStatus.state === API_STATE.ERROR) {
            setAlert(_("UUID selection was failed."));
        }
    }, [postUpdateSrvStatus.state, setAlert]);

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
