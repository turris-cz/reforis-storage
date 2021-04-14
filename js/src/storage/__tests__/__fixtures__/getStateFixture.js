/*
 * Copyright (C) 2019-2021 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

export default function getStateFixture(blocked = false) {
    return {
        blocked: blocked,
        current_device: "/dev/sdb",
        old_uuid: "1234-1234-1234-1234-1234",
        using_external: blocked ? false : true,
        is_broken: false,
        raid: "single",
        state: blocked ? "formatting" : "none",
        uuid: "1234-1234-1234-1234-1234",
    };
}

export function getStateFixtureBroken(blocked = false) {
    return {
        blocked: blocked,
        current_device: "/dev/sdb",
        old_uuid: "1234-1234-1234-1234-1234",
        using_external: true,
        is_broken: true,
        raid: "single",
        state: blocked ? "formatting" : "none",
        uuid: "1234-1234-1234-1234-1234",
    };
}
