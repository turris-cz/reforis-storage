/*
 * Copyright (C) 2019 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";
import PropTypes from "prop-types";
import { Select } from "foris";

import RAIDHelpTexts from "./RAIDHelpTexts";

export const RAID_CHOICES = {
    custom: _("Custom"),
    single: _("JBOD"),
    raid1: _("RAID1"),
};

RAIDSelect.propTypes = {
    selectedRAID: PropTypes.string.isRequired,
    setSelectedRAID: PropTypes.func.isRequired,
    storageIsPending: PropTypes.bool.isRequired,
};

export function RAIDSelect({ selectedRAID, setSelectedRAID, storageIsPending }) {
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
