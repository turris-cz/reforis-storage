/*
 * Copyright (C) 2019 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

const drives = {
    drives: [
        {
            description: "USB DISK 2.0 (7.2 GiB)",
            dev: "sdb",
            fs: "",
            uuid: "1111",
        },
        {
            description: "USB DISK (3.6 GiB)",
            dev: "sdc1",
            fs: "vfat",
            uuid: "2222",
        },
        {
            description: "USB DISK (7.2 GiB)",
            dev: "sdb1",
            fs: "ext4",
            uuid: "3333",
        },
        {
            description: "USB DISK 2.0 (3.6 GiB)",
            dev: "sdc",
            fs: "btrfs",
            uuid: "4444",
        },
    ],
};

export default drives;
