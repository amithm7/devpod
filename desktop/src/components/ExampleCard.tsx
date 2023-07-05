import { BoxProps, Card, Image, Text, Tooltip, useColorModeValue, useToken } from "@chakra-ui/react"
import React, { useId } from "react"

type TExampleCardProps = {
  name: string
  image?: string
  size?: keyof typeof sizes

  isSelected?: boolean
  isDisabled?: boolean
  onClick?: () => void
}

const sizes: Record<"sm" | "md" | "lg", BoxProps["width"]> = {
  sm: "12",
  md: "16",
  lg: "20",
} as const

export function ExampleCard({
  name,
  image,
  isSelected,
  isDisabled,
  size = "lg",
  onClick,
}: TExampleCardProps) {
  const hoverBackgroundColor = useColorModeValue("gray.50", "gray.800")
  const primaryColorLight = useToken("colors", "primary.400")
  const primaryColorDark = useToken("colors", "primary.800")

  const selectedProps = isSelected
    ? {
        _before: {
          content: '""',
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          background: `linear-gradient(135deg, ${primaryColorLight}55 30%, ${primaryColorDark}55, ${primaryColorDark}88)`,
          opacity: 0.7,
          width: "full",
          height: "full",
        },
        boxShadow: `inset 0px 0px 0px 1px ${primaryColorDark}55`,
      }
    : {}

  const disabledProps = isDisabled ? { filter: "grayscale(100%)", cursor: "not-allowed" } : {}

  return (
    <Tooltip textTransform={"capitalize"} label={name} isDisabled={size === "lg"}>
      <Card
        variant="unstyled"
        width={sizes[size]}
        height={sizes[size]}
        alignItems="center"
        display="flex"
        justifyContent="center"
        cursor="pointer"
        boxSizing="border-box"
        position="relative"
        backgroundColor="transparent"
        overflow="hidden"
        _hover={{ backgroundColor: isDisabled || isSelected ? undefined : hoverBackgroundColor }}
        {...(onClick && !isDisabled && !isSelected ? { onClick } : {})}
        {...selectedProps}
        {...disabledProps}>
        <Image objectFit="fill" overflow="hidden" zIndex="1" src={image} />
        {size === "lg" && (
          <Text
            paddingBottom="1"
            fontSize="11px"
            color="gray.500"
            fontWeight="medium"
            overflow="hidden"
            maxWidth={sizes[size]}
            textOverflow="ellipsis"
            whiteSpace="nowrap"
            textTransform={"capitalize"}>
            {name}
          </Text>
        )}
      </Card>
    </Tooltip>
  )
}
