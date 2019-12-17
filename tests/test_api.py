from http import HTTPStatus

import pytest
from flask import current_app

from enum import Enum, auto


class Method(Enum):
    GET = auto()
    POST = auto()


@pytest.mark.parametrize(
    'endpoint, module, action, method, data', [
        ('state', 'storage', 'get_state', Method.GET, {}),
        ('settings', 'storage', 'get_settings', Method.GET, {}),
        ('drives', 'storage', 'get_drives', Method.GET, {}),
        ('prepare-srv', 'storage', 'prepare_srv_drive', Method.POST, {'drives': [], 'raid': ''}),
        ('update-srv', 'storage', 'update_srv', Method.POST, {'uuid': ''}),
    ]
)
def test_api_endpoints_exist(client, endpoint, module, action, method, data):
    url = f'/storage/api/{endpoint}'

    response = None
    if method == Method.GET:
        response = client.get(url)
    if method == Method.POST:
        response = client.post(url, json=data)

    assert response.status_code == 200

    _check_called_foris_controller_module(current_app.backend._instance, module, action)


def _check_called_foris_controller_module(sender_mock, module, action):
    modules = [call[1][0] for call in sender_mock.send.mock_calls]
    actions = [call[1][1] for call in sender_mock.send.mock_calls]
    assert module in modules
    assert action in actions


@pytest.mark.parametrize(
    'data, message', [
        ({}, "Invalid JSON"),
        ({'drives': '', 'raid': ''}, {'drives': 'Expected data of type: list'}),
        ({'drives': [], 'raid': []}, {'raid': 'Expected data of type: str'}),
    ]
)
def test_prepare_srv_post_invalid_data(client, data, message):
    response = client.post('/storage/api/prepare-srv', json=data)
    assert response.status_code == HTTPStatus.BAD_REQUEST
    assert response.json == message


def test_prepare_srv_post_valid_data(client):
    response = client.post('/storage/api/prepare-srv', json={'drives': [], 'raid': ''})
    assert response.status_code == HTTPStatus.OK


@pytest.mark.parametrize(
    'data, message', [
        ({}, "Invalid JSON"),
        ({'uuid': []}, {'uuid': 'Expected data of type: str'}),
    ]
)
def test_update_srv_post_invalid_data(client, data, message):
    response = client.post('/storage/api/update-srv', json=data)
    assert response.status_code == HTTPStatus.BAD_REQUEST
    assert response.json == message


def test_update_srv_post_valid_data(client):
    response = client.post('/storage/api/update-srv', json={'uuid': ""})
    assert response.status_code == HTTPStatus.OK
