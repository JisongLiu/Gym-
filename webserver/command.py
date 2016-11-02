import re

def INSERT(DB, VALUES):
    if VERIFY([DB,VALUES]):
        data = "INSERT INTO "+ DB + " VALUES ("+VALUES+");"
        return data
    return "Invalid"

def DELETE(DB, WHERE):
    if VERIFY([DB,WHERE]):
        data = "DELETE FROM " + DB + " WHERE " + VALUES + " ;"
        return data
    return "Invalid"

def VERIFY(checked_list):
    regexp = re.compile(r'[\;|\(|\)|]+')
    for n in checked_list:
        if regexp.search(n) is True: return False
    return True

