from flask import Blueprint
routes = Blueprint('routes',__name__)

from .index import *
from .login import *
from .coach import *
from .manager import *
from .member import *
