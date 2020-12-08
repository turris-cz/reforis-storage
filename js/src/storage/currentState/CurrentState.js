/*
 * Copyright (C) 2020 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";
import PropTypes from "prop-types";

import ActiveAlert from "./ActiveAlert";
import PendingMigrationAlert from "./PendingMigrationAlert";
import BrokenSetupAlert from "./BrokenSetupAlert";
import CurrentStateTable from "./CurrentStateTable";

CurrentState.propTypes = {
    state: PropTypes.string.isRequired,
    raid: PropTypes.string.isRequired,
    uuid: PropTypes.string.isRequired,
    old_uuid: PropTypes.string.isRequired,
    old_device_desc: PropTypes.string.isRequired,
    storageIsPending: PropTypes.bool.isRequired,
};

CurrentState.defaultProps = {
    storageIsPending: false,
};

export default function CurrentState({
    state,
    raid,
    uuid,
    old_uuid,
    old_device_desc,
    storageIsPending,
}) {
    const pendingMigration = old_uuid !== uuid;
    const brokenSetup = old_uuid === "broken";
    const unsetUuid = uuid === "";
    return (
        <>
            <h2>{_("Current state")}</h2>
            {!brokenSetup && pendingMigration && <PendingMigrationAlert />}

            {brokenSetup && <BrokenSetupAlert />}

            {!brokenSetup && (
                <>
                    {!unsetUuid && !pendingMigration && (
                        <ActiveAlert uuid={uuid} device={old_device_desc} />
                    )}
                    <CurrentStateTable
                        state={state}
                        old_device_desc={old_device_desc}
                        uuid={uuid}
                        raid={raid}
                        storageIsPending={storageIsPending}
                    />
                </>
            )}
        </>
    );
}
