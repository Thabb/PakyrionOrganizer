from rest_framework.views import exception_handler
import logging

logger = logging.getLogger(__name__)


def organizer_exception_handler(exc, context):
    response = exception_handler(exc, context)
    if response is None:
        return None

    logger.error(msg=response.data['detail'])
    response.data['status_code'] = response.status_code
    return response
