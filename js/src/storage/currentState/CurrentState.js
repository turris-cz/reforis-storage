/*
 * Copyright (C) 2020-2021 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";

import PropTypes from "prop-types";

import ActiveAlert from "./ActiveAlert";
import BrokenSetupAlert from "./BrokenSetupAlert";
import CurrentStateTable from "./CurrentStateTable";
import PendingMigrationAlert from "./PendingMigrationAlert";

CurrentState.propTypes = {
    noDrives: PropTypes.bool.isRequired,
    state: PropTypes.string.isRequired,
    raid: PropTypes.string.isRequired,
    uuid: PropTypes.string.isRequired,
    old_uuid: PropTypes.string.isRequired,
    current_device: PropTypes.string.isRequired,
    is_broken: PropTypes.bool.isRequired,
    using_external: PropTypes.bool.isRequired,
    storageIsPending: PropTypes.bool.isRequired,
    disk_mounted: PropTypes.bool.isRequired,
};

CurrentState.defaultProps = {
    storageIsPending: false,
};

export default function CurrentState({
    noDrives,
    state,
    raid,
    uuid,
    old_uuid,
    current_device,
    is_broken,
    using_external,
    storageIsPending,
    disk_mounted,
}) {
    const unsetUuid = uuid === "";
    const initialState = old_uuid === "rootfs";
    const pendingMigration = old_uuid !== uuid && (!unsetUuid || !initialState);
    return (
        <>
            <h2>{_("Current State")}</h2>
            {noDrives && (
                <p className="text-center text-muted">
                    {_(
                        "No drives connected. Please connect a drive and refresh the page."
                    )}
                </p>
            )}
            {disk_mounted &&
                !is_broken &&
                !storageIsPending &&
                pendingMigration && <PendingMigrationAlert />}

            {is_broken && <BrokenSetupAlert />}

            {!noDrives && !is_broken && (
                <>
                    {using_external && !unsetUuid && !pendingMigration && (
                        <ActiveAlert uuid={uuid} device={current_device} />
                    )}
                    <CurrentStateTable
                        state={state}
                        current_device={current_device}
                        uuid={uuid}
                        raid={raid}
                        storageIsPending={storageIsPending}
                    />
                </>
            )}
        </>
    );
}
