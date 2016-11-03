# Description of the functionalities provided for different user
This function list envolved Manager, Member and Coach

## Manager

### View
- Openning Courses
- All equipment
- Member Information
- Coach Information
- Equipment under maintainance

### Modification
- Add/Modify/Delete Coach information
- Add/Modify/Delete Member information
- Maintain Euquipment
- Add/Modify/Delete Equipment Information

## Coach

### View
#### Openning Halls for trainning
Based on user selection, return a list of available slots
Getting all hall's name
```sql
SELECT * FROM hall;
```
Getting all occupied timeslot of the certain hall
```sql
SELECT timeslot FROM instruction WHERE name = "name";
```
#### Personal reserved Priavate trainning course

#### Personal Courses
#### Instructions? all instruction and all he to only get himself instruction???

### Modification

instruction (only can add ID=this.ID)

## Member

### View
- Registed/Available Courses
- Personal Trainning Slot
- Peronal Assigned Coach
- Available Equipment

### Modification

study (only can add ID=this.ID), train (only can add ID=this.ID), Borrow (only can add ID=this.ID)
