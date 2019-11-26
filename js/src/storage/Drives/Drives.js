/*
 * Copyright (C) 2019 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React, { useEffect, useState } from "react";
import {
    API_STATE, Button, Select, useAlert, useAPIPost,
} from "foris";

import DrivesTable from "./DrivesTable";
import API_URLs from "../../API";

const RAID_CHOICES = {
    custom: _("Custom"),
    single: _("JBOD"),
    raid1: _("RAID1"),
};

export default function Drives({ drives, currentUUID, storageIsPending }) {
    const [selectedDrives, setSelectedDrives] = useState([]);
    const [selectedRAID, setSelectedRAID] = useState(Object.keys(RAID_CHOICES)[0]);

    // TODO: Add modal warning.
    // The modal message is depend if uuid is selected or not.
    const [prepareSrvRequestStatus, prepareSrvRequest] = useAPIPost(API_URLs.prepareSrv);
    const [setAlert] = useAlert();
    useEffect(() => {
        if (prepareSrvRequestStatus.state === API_STATE.ERROR) {
            setAlert(_("Device preparing was failed."));
        }
    }, [prepareSrvRequestStatus.state, setAlert]);

    function prepareSrv(event) {
        event.preventDefault();
        prepareSrvRequest({
            drives: selectedDrives,
            raid: selectedRAID,
        });
    }

    const buttonIsDisabled = (
        selectedDrives.length === 0
        || (selectedDrives.length < 2 && selectedRAID === "raid1")
        || storageIsPending
    );

    return (
        <form onSubmit={prepareSrv}>
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
                type="submit"
                forisFormSize
                disabled={buttonIsDisabled}
            >
                {_("Format&Set")}
            </Button>
        </form>
    );
}

const RAID_HELP_TEXTS = {
    custom: _(`
Don't change the RAID level, keeps everything set the way it was. Useful if you have a really custom setup of your RAID
we don't support and want to just add/remove some disks.
    `),
    JBOD: _(`
No redundancy, if one drive fails, you loose your data. On the other hand, provides the most space - sum of the space
available on all included drives.
    `),
    RAID1: _(`
Everything is redundant and stored at two distinct drives. If you loose one drive, you can easily replace it without
loosing any data. On the other hand, you have a half of the disk space you would have with JBOD.
        `),
};

function RAIDHelpTexts() {
    return (
        <>
            <h5>{_("Custom")}</h5>
            <p>{RAID_HELP_TEXTS.custom}</p>
            <h5>{_("JBOD")}</h5>
            <p>{RAID_HELP_TEXTS.JBOD}</p>
            <h5>{_("RAID1")}</h5>
            <p>{RAID_HELP_TEXTS.RAID1}</p>
        </>
    );
}

function RAIDSelect({ selectedRAID, setSelectedRAID, storageIsPending }) {
    return (
        <>
            <RAIDHelpTexts />
            <Select
                label={_("RAID")}
                choices={RAID_CHOICES}
                value={selectedRAID}
                onChange={(e) => {
                    setSelectedRAID(e.target.value);
                }}

                disabled={storageIsPending}
            />
        </>
    );
}
