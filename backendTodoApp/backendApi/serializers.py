from rest_framework import serializers
from .models import StatusDetails,TodoDetails,BucketDetails


class StatusDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model=StatusDetails
        fields = '__all__'

class BucketDetailsSerializer(serializers.ModelSerializer):

    class Meta:
        model = BucketDetails
        fields ='__all__'
class TodoDetailsSerializer(serializers.ModelSerializer):
    serializers.CharField(source='todo_status.name', read_only=True)
    class Meta:
        model = TodoDetails
        fields= '__all__'

class BucketTodoDetailsSerializer(serializers.ModelSerializer):
    todo = serializers.SerializerMethodField(read_only=True)
    print(todo)
    class Meta:
        model = BucketDetails
        fields = '__all__'
        depth = 1

    def get_todo(self, obj): # method name is: get_<field_name_define_above>
        print(obj.bucket_name)
        #qs = obj.todo.all().order_by('todo_bucket')
        data = TodoDetails.objects.filter(todo_bucket=str(obj.bucket_name))
        print(data)
        if data:
            #print(data.TodoDetails)
            return [{"id":todo.todo_id, "name":todo.todo_name, "status":todo.todo_status.status_name}
                    for todo in data]
        else:
            return []