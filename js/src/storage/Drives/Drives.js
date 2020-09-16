/*
 * Copyright (C) 2020 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React, { useEffect, useState } from "react";
import {
    API_STATE, Button, useAlert, useAPIPost,
} from "foris";
import PropTypes from "prop-types";

import DrivesTable from "./DrivesTable";
import API_URLs from "../../API";
import { RAID_CHOICES, RAIDSelect } from "./RAID";
import ConfirmationModal from "./ConfirmationModal";

Drives.propTypes = {
    drives: PropTypes.arrayOf(
        PropTypes.shape({
            dev: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            fs: PropTypes.string.isRequired,
            uuid: PropTypes.string.isRequired,
        }),
    ).isRequired,
    currentUUID: PropTypes.string.isRequired,
    storageIsPending: PropTypes.bool.isRequired,
};

Drives.defaultProps = {
    storageIsPending: false,
};

export default function Drives({ drives, currentUUID, storageIsPending }) {
    const [selectedDrives, setSelectedDrives] = useState([]);
    const [selectedRAID, setSelectedRAID] = useState(
        Object.keys(RAID_CHOICES)[0],
    );
    const [confirmationModalShown, setConfirmationModalShown] = useState(false);

    const [prepareSrvPostStatus, prepareSrvPost] = useAPIPost(
        API_URLs.prepareSrv,
    );
    const [setAlert] = useAlert();
    useEffect(() => {
        if (prepareSrvPostStatus.state === API_STATE.ERROR) {
            setAlert(_("Device preparation failed."));
        }
    }, [prepareSrvPostStatus.state, setAlert]);

    function prepareSrv(event) {
        event.preventDefault();
        prepareSrvPost({
            data: {
                drives: selectedDrives,
                raid: selectedRAID,
            },
        });
    }

    const buttonIsDisabled = selectedDrives.length === 0
        || (selectedDrives.length < 2 && selectedRAID === "raid1")
        || storageIsPending;

    return (
        <>
            <ConfirmationModal
                shown={confirmationModalShown}
                setShown={setConfirmationModalShown}
                onConfirm={prepareSrv}
                isFirstDrive={currentUUID === "rootfs"}
            />
            <RAIDSelect
                selectedRAID={selectedRAID}
                setSelectedRAID={setSelectedRAID}
                storageIsPending={storageIsPending}
            />
            <DrivesTable
                drives={drives}
                selectedDrives={selectedDrives}
                setSelectedDrives={setSelectedDrives}
                currentUUID={currentUUID}
                storageIsPending={storageIsPending}
            />
            <Button
                className="btn-primary mb-2 mb-md-0 ml-auto col-sm-12 col-md-4 col-lg-2"
                onClick={() => setConfirmationModalShown(true)}
                disabled={buttonIsDisabled}
            >
                {_("Format & Set")}
            </Button>
        </>
    );
}
