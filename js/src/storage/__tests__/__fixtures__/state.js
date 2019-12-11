export default function state(blocked = false) {
    return {
        "blocked": blocked,
        "old_device_desc": "/dev/mmcblk0p1",
        "old_uuid": "rootfs",
        "raid": "custom",
        "state": blocked ? "formatting" : "none",
        "uuid": ""
    }
};
