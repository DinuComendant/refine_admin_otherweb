import { Brief } from "@/app/interfaces";
import { Alert } from "@mui/material";
import { FieldErrors } from "react-hook-form";

interface Props {
  firstIndex: number;
  secondIndex: number | null;
  firstProperty: string;
  secondProperty: string | null;
  errors: FieldErrors<Brief>;
}

export const ErrorMessage = ({
  firstIndex,
  secondIndex,
  firstProperty,
  secondProperty,
  errors,
}: Props) => {
  const noSecondIndexProperty = (
    <div>
      {
        //@ts-ignore
        errors.blocks?.[firstIndex]?.[firstProperty] && (
          <Alert severity="error">
            {/* @ts-ignore */}
            {errors.blocks[firstIndex][firstProperty].message}
          </Alert>
        )
      }
    </div>
  );

  const noSecondIndex = secondProperty !== null && (
    <div>
      {
        // @ts-ignore
        errors?.blocks?.[firstIndex]?.[firstProperty]?.[secondProperty] && (
          <Alert severity="error">
            {/* @ts-ignore */}
            {errors.blocks[firstIndex][firstProperty][secondProperty].message}
          </Alert>
        )
      }
    </div>
  );

  const allProps = secondIndex !== null &&
    secondProperty !== null &&
    secondProperty !== undefined && (
      <div>
        {
          // @ts-ignore
          errors?.blocks?.[firstIndex]?.[firstProperty]?.[secondIndex]?.[
            secondProperty
          ] && (
            <Alert severity="error">
              {
                // @ts-ignore
                errors.blocks[firstIndex][firstProperty][secondIndex][
                  secondProperty
                ].message
              }
            </Alert>
          )
        }
      </div>
    );
  return secondIndex !== null && secondIndex !== undefined
    ? allProps
    : secondProperty !== null && secondProperty !== undefined
    ? noSecondIndex
    : noSecondIndexProperty;
};
