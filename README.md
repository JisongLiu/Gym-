# Cloud Gym Management System 
gym for database course

ERM Online Drawing Tool: https://www.lucidchart.com/

For GYM Facilities: http://www.leehayward.com/gym_equipment/

## Gym description

The Cloud Gym Management System are aimed to provide the modern informatized fitness center supported by the convenient and flexible management system. By deploying this system, manager would be benefited from the real-time management on equipment, membership of fitness center. Member and fitness coach can arrange a time slot for their fitness training plan. Maintainers could know whether certain equipment is out of state. Moreover, manager can supervise this process and urge maintainers to address the problem of frastructure if the problem is unresponsive for a specific time period.

### Entity and analysis:
- Manager: ID, Expiration Date
- Coach: ID, expiration time, level
- Member:ID, level, expiration data
- Maintainer:  ID, expiration time
- Equipment: Brand, Status, ID, Category
- Person (from logic layer, Manager, Coach, Member and Maintainer is a person): ID, Name, Age, Gender

### Relationship
- (Member, Manager, Coach, Maintainer) ISA Person
- Maintainer MAINTAINS Equipment ( this table will have MaintainerID, EquipmentID)
- Manager MANAGER Coach, Maintainer ( this table will have ManagerID and XXXID)
- Member RESERVE Coach （this table will have MemberID, CoachID, Timeslot）
- Manager SERVER Member (this table will have ManagerID and MemberID)

-Since there is no obligable limitation for member to use facilities, we should not have a relationship between member and facilities.

### Limitations on Relationship
- one facility could only be maintained by one maintainer
- a member could reserve at most one coach in a time slot
- a member could reserve facility that is reservable in a time slot
- a coach could organize at most one course in a time slot
- a hall could be reserved by at most one coach in a time slot
- Course and Open are weak entity
