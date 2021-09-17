FROM public.ecr.aws/lambda/python:3.8

COPY . .

RUN pip install --upgrade pip && \
  pip install -r requirements.txt

CMD ["reputation-lists.lambda_handler"] 