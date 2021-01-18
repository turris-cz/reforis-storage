/*
 * Copyright (C) 2019 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

export default function getStateFixture(blocked = false) {
    return {
        blocked: blocked,
        current_device: "/dev/sdb",
        using_external: "1234-1234-1234-1234-1234",
        raid: "single",
        state: blocked ? "formatting" : "none",
        uuid: "1234-1234-1234-1234-1234",
    };
}
