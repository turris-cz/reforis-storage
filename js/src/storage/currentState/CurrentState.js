/*
 * Copyright (C) 2019 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";

import PendingMigration from "./PendingMigration";
import BrokenSetup from "./BrokenSetup";
import CurrentStateTable from "./CurrentStateTable";

export default function CurrentState({
    state, raid, uuid, old_uuid, old_device_desc, storageIsPending,
}) {
    const pendingMigration = old_uuid !== uuid;
    const brokenSetup = old_uuid === "broken";
    return (
        <>
            {!brokenSetup && pendingMigration && <PendingMigration />}

            {brokenSetup && <BrokenSetup />}

            <CurrentStateTable
                state={state}
                old_device_desc={old_device_desc}
                uuid={uuid}
                raid={raid}
                storageIsPending={storageIsPending}
            />
        </>
    );
}
