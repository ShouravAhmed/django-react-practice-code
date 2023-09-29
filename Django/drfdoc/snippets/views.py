from django.shortcuts import render

from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser

from django.http import HttpResponse, JsonResponse

import io

from snippets.models import Snippet
from snippets.serializers import SnippetSerializer, ModelSnippetSerializer


def snippetsList(requests):
    snippet = Snippet.objects.all()
    serializer = ModelSnippetSerializer(snippet, many=True)

    content = JSONRenderer().render(serializer.data)

    print(repr(serializer))

    return HttpResponse(content)
    return JsonResponse(serializer.data, safe=False)


def snippetDetail(requests, pk):
    snippet = Snippet.objects.get(id=pk)

    # data serilized into python native data
    serializer = SnippetSerializer(snippet)

    # render the serilized data in json
    content = JSONRenderer().render(serializer.data)

    # deserilize json data into python native dict
    stream = io.BytesIO(content)
    data = JSONParser().parse(stream)

    data.pop('code')
    data["greet"] = "hello"

    serializer = SnippetSerializer(data=data)

    print("\ndata :", data)
    print("serializer.is_valid() :", serializer.is_valid())
    print(serializer.validated_data, "\n")

    return HttpResponse(content)
    return JsonResponse(serializer.data)
