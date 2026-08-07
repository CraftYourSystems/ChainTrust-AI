import algosdk from "algosdk";
import { NextRequest, NextResponse } from "next/server";
import { InvalidAddressError } from "../errors/wallet.errors";

/**
 * Validates an Algorand address.
 * Throws InvalidAddressError if validation fails.
 */
export function validateAlgorandAddress(address: string) {
  if (!address || typeof address !== 'string') {
    throw new InvalidAddressError("Address must be a string");
  }

  // Algorand addresses are exactly 58 characters long base32 strings
  if (address.length !== 58) {
    throw new InvalidAddressError(`Length must be 58, got ${address.length}`);
  }

  if (!algosdk.isValidAddress(address)) {
    throw new InvalidAddressError(`Checksum failed for address: ${address}`);
  }
}

/**
 * Higher-order function to wrap API route handlers with address validation.
 * Expects the address to be passed as a route parameter (e.g., params.address).
 */
export function withAddressValidation(handler: (req: NextRequest, params: any) => Promise<NextResponse>) {
  return async (req: NextRequest, { params }: { params: Promise<{ address?: string }> }) => {
    try {
      const resolvedParams = await params;
      if (!resolvedParams || !resolvedParams.address) {
        throw new InvalidAddressError("Address parameter is missing");
      }
      validateAlgorandAddress(resolvedParams.address);
      return await handler(req, { params: resolvedParams });
    } catch (error: any) {
      if (error instanceof InvalidAddressError) {
        return NextResponse.json(
          { success: false, error: { code: error.code, message: error.message } },
          { status: error.statusCode }
        );
      }
      return NextResponse.json(
        { success: false, error: { code: "INTERNAL_ERROR", message: error.message } },
        { status: 500 }
      );
    }
  };
}
