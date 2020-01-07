/*
 * Copyright (C) 2019 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";

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

export default function RAIDHelpTexts() {
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