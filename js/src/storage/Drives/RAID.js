/*
 * Copyright (C) 2020 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";
import PropTypes from "prop-types";
import { Select } from "foris";

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

export function RAIDSelect({
    selectedRAID,
    setSelectedRAID,
    storageIsPending,
}) {
    let raidHelpText;
    switch (selectedRAID) {
        case "raid1":
            raidHelpText = `RAID1: ${RAID_HELP_TEXTS.RAID1}`;
            break;
        case "single":
            raidHelpText = `JBOD: ${RAID_HELP_TEXTS.JBOD}`;
            break;
        default:
            raidHelpText = `Custom: ${RAID_HELP_TEXTS.custom}`;
            break;
    }

    return (
        <Select
            label={_("RAID")}
            choices={RAID_CHOICES}
            value={selectedRAID}
            onChange={(e) => {
                setSelectedRAID(e.target.value);
            }}
            disabled={storageIsPending}
            helpText={raidHelpText}
        />
    );
}
