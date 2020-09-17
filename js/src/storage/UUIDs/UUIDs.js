/*
 * Copyright (C) 2020 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { API_STATE, useAlert, useAPIPost } from "foris";

import API_URLs from "../../API";
import { filterNonBTRFS, groupDrivesByUUIDs } from "../utils";
import UUIDsTable from "./UUIDsTable";
import UUIDsActionButtons from "./UUIDsActionButtons";

UUIDs.propTypes = {
    drives: PropTypes.arrayOf(
        PropTypes.shape({
            dev: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            fs: PropTypes.string.isRequired,
            uuid: PropTypes.string.isRequired,
        })
    ).isRequired,
    currentUUID: PropTypes.string.isRequired,
    storageIsPending: PropTypes.bool.isRequired,
    updateUUIDCallback: PropTypes.func.isRequired,
};

UUIDs.defaultProps = {
    storageIsPending: false,
};

export default function UUIDs({
    drives,
    currentUUID,
    storageIsPending,
    updateUUIDCallback,
}) {
    const [selectedUUID, setSelectedUUID] = useState(currentUUID);
    const [postUpdateSrvStatus, postUpdateSrv] = useAPIPost(API_URLs.updateSrv);
    const [setAlert] = useAlert();
    useEffect(() => {
        if (postUpdateSrvStatus.state === API_STATE.ERROR) {
            setAlert(_("UUID selection failed."));
        } else if (postUpdateSrvStatus.state === API_STATE.SUCCESS) {
            updateUUIDCallback();
        }
    }, [postUpdateSrvStatus.state, setAlert, updateUUIDCallback]);

    function onUnselectSrv() {
        postUpdateSrv({ data: { uuid: "" } });
    }

    function onUpdateSrv() {
        postUpdateSrv({ data: { uuid: selectedUUID } });
    }

    const drivesByUUIDs = groupDrivesByUUIDs(filterNonBTRFS(drives));

    if (Object.keys(drivesByUUIDs).length === 0) {
        return (
            <p className="text-muted text-center">
                {_("There aren't prepared drives to be used.")}
            </p>
        );
    }

    const buttonIsDisabled =
        selectedUUID.length === 0 ||
        selectedUUID.length < 2 ||
        storageIsPending;

    return (
        <>
            <UUIDsTable
                drivesByUUIDs={drivesByUUIDs}
                selectedUUID={selectedUUID}
                setSelectedUUID={setSelectedUUID}
                storageIsPending={storageIsPending}
            />
            <UUIDsActionButtons
                onUnselectSrv={onUnselectSrv}
                onUpdateSrv={onUpdateSrv}
                buttonIsDisabled={buttonIsDisabled}
            />
        </>
    );
}
