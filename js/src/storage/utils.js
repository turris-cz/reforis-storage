/*
 * Copyright (C) 2019 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";

export function filterNonBTRFS(drives) {
    return drives.filter((drive) => drive.fs === "btrfs");
}

export function groupDrivesByUUIDs(drives) {
    return drives.reduce((accumulator, drive) => {
        if (!drive.uuid) return accumulator;

        if (accumulator[drive.uuid]) {
            accumulator[drive.uuid].push(drive);
        } else {
            accumulator[drive.uuid] = [drive];
        }

        return accumulator;
    }, {});
}
