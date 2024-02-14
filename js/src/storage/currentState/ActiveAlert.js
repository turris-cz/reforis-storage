/*
 * Copyright (C) 2020 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";

import { Alert, ALERT_TYPES } from "foris";
import PropTypes from "prop-types";

ActiveAlert.propTypes = {
    device: PropTypes.string.isRequired,
    uuid: PropTypes.string.isRequired,
};

const CURRENTLY_IN_USE = _(`
Device currently in use is
`);

export default function ActiveAlert({ device, uuid }) {
    return (
        <Alert type={ALERT_TYPES.SUCCESS}>
            {CURRENTLY_IN_USE}
            <b>{device}</b>
            {` (UUID: ${uuid}).`}
        </Alert>
    );
}
