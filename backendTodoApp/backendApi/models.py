from django.db import models

# Create your models here.

class BucketDetails(models.Model):
    """sumary_line
    
    Keyword arguments:
    argument -- bucket_name
    Return: bucket_name
    """
    bucket_id = models.AutoField(primary_key=True)
    bucket_name = models.CharField(max_length=50,unique=True)

    class Meta:
        db_table= 'Bucket_table'
    
    def __str__(self):
        return f"bucket_id:{self.bucket_id} | bucket_name:{self.bucket_name} "
class StatusDetails(models.Model):
    """sumary_line
    
    Keyword arguments:
    argument --status_name
    Return: status_name
    """
    
    status_name = models.CharField(max_length=10,unique=True)

    class Meta:
        db_table= 'Status_table'
    
    def __str__(self):
        return f"status_name:{self.status_name} "

class TodoDetails(models.Model):
    """ summary_line
     Keyword arguments:
    argument -- todo_name,todo_status,todo_bucket
    Return: todo_name
    """
    todo_id = models.AutoField(primary_key=True)
    todo_name = models.CharField(max_length=50,null=False)
    todo_status = models.ForeignKey(StatusDetails,to_field="status_name",on_delete=models.CASCADE)
    todo_bucket = models.ForeignKey(BucketDetails,to_field="bucket_name",on_delete=models.CASCADE)
    
    class Meta:
        db_table ='Todo_table'

    def __str__(self):
        return f"todo_name:{self.todo_name} | todo_status:{self.todo_status} | todo_bucket:{self.todo_bucket}"

