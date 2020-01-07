#  Copyright (C) 2019 CZ.NIC z.s.p.o. (http://www.nic.cz/)
#
#  This is free software, licensed under the GNU General Public License v3.
#  See /LICENSE for more information.

from http import HTTPStatus
from pathlib import Path
from flask import Blueprint, current_app, jsonify, request
from flask_babel import gettext as _

from reforis.foris_controller_api.utils import APIError, validate_json

# pylint: disable=invalid-name
blueprint = Blueprint(
    'Storage',
    __name__,
    url_prefix='/storage/api',
)

BASE_DIR = Path(__file__).parent

# pylint: disable=invalid-name
storage = {
    'blueprint': blueprint,
    # Define {python_module_name}/js/app.min.js
    # See https://gitlab.labs.nic.cz/turris/reforis/reforis-distutils/blob/master/reforis_distutils/__init__.py#L11
    'js_app_path': 'reforis_storage/js/app.min.js',
    'translations_path': BASE_DIR / 'translations',
}


@blueprint.route('/state', methods=['GET'])
def state():
    return jsonify(current_app.backend.perform('storage', 'get_state'))


@blueprint.route('/settings', methods=['GET'])
def settings():
    return jsonify(current_app.backend.perform('storage', 'get_settings'))


@blueprint.route('/drives', methods=['GET'])
def drives():
    return jsonify(current_app.backend.perform('storage', 'get_drives'))


@blueprint.route('/prepare-srv', methods=['POST'])
def prepare_srv():
    """
    Format specified disks to btrfs with specified RAID.
    Request data example: {"disks": ["sda", "sdb", "sdc"], "raid": "raid1"}.
    """
    data = request.json
    validate_json(data, {'drives': list, 'raid': str})
    response = current_app.backend.perform('storage', 'prepare_srv_drive', data)
    if response.get('result') is not True:
        raise APIError(_('Device preparation failed.'), HTTPStatus.INTERNAL_SERVER_ERROR)
    return '', HTTPStatus.OK


@blueprint.route('/update-srv', methods=['POST'])
def update_srv():
    """
    Select active disk (the one that is mounted on /srv path). Disk is specified by its UUID (in request body).
    Request data example: {"uuid": "1234"}.
    """
    data = request.json
    validate_json(data, {'uuid': str})
    response = current_app.backend.perform('storage', 'update_srv', data)
    if response.get('result') is not True:
        raise APIError(_('UUID set failed.'), HTTPStatus.INTERNAL_SERVER_ERROR)
    return '', HTTPStatus.OK
