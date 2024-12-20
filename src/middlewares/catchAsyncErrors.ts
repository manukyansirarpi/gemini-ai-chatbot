import { NextRequest, NextResponse } from "next/server";
type HandlerFunction = (
  request: NextRequest,
  params: any
) => Promise<NextResponse>;

interface ValidationError {
  message: string;
}

export const catchAsyncErrors =
  (handler: HandlerFunction) => async (request: NextRequest, params?: any) => {
    try {
      return await handler(request, params);
    } catch (error: any) {
      if (error?.name === "CastError") {
        error.message = `Resource not found. Invalid ${error?.path}`;
        error.statusCode = 400;
      }

      if (error?.name === "ValidationError") {
        error.message = Object.values<ValidationError>(error.errors).map(
          (value) => value.message
        );
        error.statusCode = 400;
      }

      // Handling mongoose duplicate key error
      if (error.code === 11000) {
        error.message = `Duplicate ${Object.keys(error.keyValue)} entered`;
      }

      return NextResponse.json(
        {
          errMessage: error.message,
        },
        {
          status: error.statusCode || 500,
        }
      );
    }
  };
