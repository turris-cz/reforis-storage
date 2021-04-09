/*
 * Copyright (C) 2019 CZ.NIC z.s.p.o. (http://www.nic.cz/)
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

export default function DrivesOperations(props) {
    const { updateUUIDCallback, drives } = props;
    if (drives.length === 0) {
        return (
            <p className="text-center text-muted">
                {_(
                    "No drives connected, please connect a drive and refresh the page."
                )}
            </p>
        );
    }
    return (
        <>
            <h2>{_("Prepare Drives")}</h2>
            <Drives {...props} />

            <h2>{_("Use Prepared Storage")}</h2>
            <UUIDs updateUUIDCallback={updateUUIDCallback} {...props} />
        </>
    );
}
