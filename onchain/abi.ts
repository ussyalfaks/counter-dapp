export const COUNTER_ABI = [
    {
      "name": "ContractImpl",
      "type": "impl",
      "interface_name": "counter::Counter::ICounter"
    },
    {
      "name": "core::integer::u256",
      "type": "struct",
      "members": [
        {
          "name": "low",
          "type": "core::integer::u128"
        },
        {
          "name": "high",
          "type": "core::integer::u128"
        }
      ]
    },
    {
      "name": "counter::Counter::ICounter",
      "type": "interface",
      "items": [
        {
          "name": "get_count",
          "type": "function",
          "inputs": [],
          "outputs": [
            {
              "type": "core::integer::u256"
            }
          ],
          "state_mutability": "view"
        },
        {
          "name": "increase",
          "type": "function",
          "inputs": [],
          "outputs": [],
          "state_mutability": "external"
        },
        {
          "name": "decrease",
          "type": "function",
          "inputs": [],
          "outputs": [],
          "state_mutability": "external"
        },
        {
          "name": "reset_count",
          "type": "function",
          "inputs": [],
          "outputs": [],
          "state_mutability": "external"
        },
        {
          "name": "increase_by",
          "type": "function",
          "inputs": [
            {
              "name": "value",
              "type": "core::integer::u256"
            }
          ],
          "outputs": [],
          "state_mutability": "external"
        },
        {
          "name": "decrease_by",
          "type": "function",
          "inputs": [
            {
              "name": "value",
              "type": "core::integer::u256"
            }
          ],
          "outputs": [],
          "state_mutability": "external"
        }
      ]
    },
    {
      "kind": "struct",
      "name": "counter::Counter::Events::CountIncreased",
      "type": "event",
      "members": [
        {
          "kind": "data",
          "name": "value",
          "type": "core::integer::u256"
        }
      ]
    },
    {
      "kind": "struct",
      "name": "counter::Counter::Events::CountDecreased",
      "type": "event",
      "members": [
        {
          "kind": "data",
          "name": "value",
          "type": "core::integer::u256"
        }
      ]
    },
    {
      "kind": "struct",
      "name": "counter::Counter::Events::CountReset",
      "type": "event",
      "members": []
    },
    {
      "kind": "enum",
      "name": "counter::Counter::Counter::Event",
      "type": "event",
      "variants": [
        {
          "kind": "nested",
          "name": "CountIncreased",
          "type": "counter::Counter::Events::CountIncreased"
        },
        {
          "kind": "nested",
          "name": "CountDecreased",
          "type": "counter::Counter::Events::CountDecreased"
        },
        {
          "kind": "nested",
          "name": "CountReset",
          "type": "counter::Counter::Events::CountReset"
        }
      ]
    }
  ] as const