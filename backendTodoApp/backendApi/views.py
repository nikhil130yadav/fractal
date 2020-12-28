from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import StatusDetails,TodoDetails,BucketDetails
from .serializers import StatusDetailsSerializer,BucketDetailsSerializer,TodoDetailsSerializer
from .serializers import BucketTodoDetailsSerializer
# Create your views here.


class StatusDetailsViewSet(viewsets.ModelViewSet):
    serializer_class = StatusDetailsSerializer
    queryset = StatusDetails.objects.all()
    lookup_field = 'status_name'

class BucketDetailsViewSet(viewsets.ModelViewSet):
    serializer_class = BucketDetailsSerializer
    queryset = BucketDetails.objects.all()
    lookup_field = 'bucket_id'

    

class TodoDetailsViewSet(viewsets.ModelViewSet):
    serializer_class = TodoDetailsSerializer
    queryset = TodoDetails.objects.all()
    lookup_field = 'todo_id'

@api_view(['GET'])
#@permission_classes((IsAuthenticated,))
def Bucket_todos_Details(request):
   
    buckets = BucketDetails.objects.all()
    print(buckets)
    data = BucketTodoDetailsSerializer(buckets, many=True).data
    return Response(data)