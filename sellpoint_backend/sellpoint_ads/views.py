from .serializers import AdSerializer
from .models import Ad
from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(['GET'])
def apiOverview(request):
    api_urls = {
        'List': '/ad-list',
        'NotSoldList:': 'ad-all-list/',
        'Detail View': '/ad-detail/<str:pk>', 
        'Create': '/ad-create/',
        'Update': '/ad-update/<str:pk>', #Only user access
        'Delete': '/ad-delete/<str:pk>', #Only user access
        #Maybe also add a category endpoint
    }
    return Response(api_urls)

@api_view(['GET'])
def adNotSoldList(request):
    ads = Ad.objects.all().filter(is_sold=False)
    serializer = AdSerializer(ads, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def adList(request):
    ads = Ad.objects.all()
    serializer = AdSerializer(ads, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def adDetail(request, pk):
    ads = Ad.objects.get(id=pk)
    serializer = AdSerializer(ads, many=False)
    return Response(serializer.data)


@api_view(['POST'])
def adCreate(request):
    serializer = AdSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['POST'])
def adUpdate(request, pk):
    #Need to add a user check before allowing update
    ad = Ad.objects.get(id=pk)
    serializer = AdSerializer(instance=ad, data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['DELETE'])
def adDelete(request, pk):
    #Need to add a user check before allowing delete
    ad = Ad.objects.get(id=pk)
    ad.delete()
    return Response("Delete successfull")


