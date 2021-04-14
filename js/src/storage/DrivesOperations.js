/*
 * Copyright (C) 2019-2021 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";
import PropTypes from "prop-types";

import Drives from "./Drives/Drives";
import UUIDs from "./UUIDs/UUIDs";

DrivesOperations.propTypes = {
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

DrivesOperations.defaultProps = {
    storageIsPending: false,
};

const INTRO_DESCRIPTION = _(
    `Here you can select which one of the already prepared drives should be
used as external storage. If you already have a device that you used
with the Turris router before, you can set it to be used as external
storage here. Alternatively, if you are migrating your drive to another
Turris device, you can disable external storage here. In such a case,
all your data will remain on the external drive that you can connect
elsewhere. Your /srv will use internal storage again but no data will
be migrated. That means that services like MySQL will end up with empty
databases and LXC virtual machines will be unavailable.`
);

export default function DrivesOperations(props) {
    const { updateUUIDCallback, drives, storageIsPending } = props;

    if (storageIsPending) return null;

    if (drives.length === 0) {
        return (
            <p className="text-center text-muted">
                {_(
                    "No drives connected. Please connect a drive and refresh the page."
                )}
            </p>
        );
    }

    return (
        <>
            <h2>{_("Prepare Drives")}</h2>
            <Drives {...props} />

            <h2>{_("Drive Selection")}</h2>
            <p>{INTRO_DESCRIPTION}</p>
            <UUIDs updateUUIDCallback={updateUUIDCallback} {...props} />
        </>
    );
}
